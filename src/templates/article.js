import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import LanguageSwitcherContextProvider from "../components/context/language-switcher-context"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PageTitle from "../components/page-title"
import Tags from "../components/tags"
import FeatureImage from "../components/feature-image"

import { container } from "../styles/layout.module.scss"

const Article = ({ data }) => {
  const node = data.nodeArticle
  const translations = data.allNodeArticle.edges

  return (
    <LanguageSwitcherContextProvider translations={translations}>
      <Layout>
        <Seo title={node.title} />
        <div className={container}>
          <PageTitle title={node.title} />
          <Tags lang={node.langcode} data={node.relationships.field_tags} />
          <FeatureImage media={node.relationships.field_media_image} />
          {node.body ? (
            <div dangerouslySetInnerHTML={{ __html: node.body.processed }} />
          ) : null}
        </div>
      </Layout>
    </LanguageSwitcherContextProvider>
  )
}

Article.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Article

export const query = graphql`
  query ($language: String!, $nodeId: String!, $internalNid: Int!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    nodeArticle(id: { eq: $nodeId }) {
      langcode
      id
      drupal_internal__nid
      title
      body {
        processed
      }
      relationships {
        field_media_image {
          relationships {
            field_media_image {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 960
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
          }
          field_media_image {
            alt
          }
        }
        field_tags {
          id
          name
          path {
            alias
          }
        }
      }
    }
    allNodeArticle(filter: { drupal_internal__nid: { eq: $internalNid } }) {
      edges {
        node {
          langcode
          id
          path {
            alias
          }
        }
      }
    }
  }
`
