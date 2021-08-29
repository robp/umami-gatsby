import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import classNames from "classnames"
import { useI18next } from "gatsby-plugin-react-i18next"

import LanguageSwitcherContextProvider from "../components/context/language-switcher-context"

import Layout from "../components/layout/layout-node"
import Seo from "../components/seo"
import Field from "../components/field"
import Tags from "../components/tags"
import FeatureImage from "../components/feature-image"

import * as nodeStyles from "../styles/node.module.scss"
import * as layoutStyles from "../styles/layout.module.scss"

const Article = ({ location, data }) => {
  const { language } = useI18next()

  const node = data.nodeArticle
  const translations = data.allNodeArticle.edges

  return (
    <LanguageSwitcherContextProvider translations={translations}>
      <Layout>
        <Seo title={node.title} />
        <article
          about={location.pathname}
          typeof="schema:Article"
          className={classNames(nodeStyles.node, nodeStyles.viewModeFull)}
        >
          <header className={nodeStyles.header}>
            <h1>
              <Field labelHidden property="schema:name">
                {node.title}
              </Field>
            </h1>
          </header>
          <footer className={nodeStyles.meta}>
            <div className={nodeStyles.submitted}>
              <span className={nodeStyles.byAuthor}>
                by{" "}
                <Field labelHidden element="span" rel="schema:author">
                  <span typeof="schema:Person" property="schema:name">
                    {node.relationships.uid?.display_name}
                  </span>
                </Field>{" "}
              </span>{" "}
              {node.createdFormatted}
              <span
                property="schema:dateCreated"
                content={node.created}
                className="rdf-meta hidden"
              ></span>
            </div>
          </footer>
          <div className={nodeStyles.content}>
            <div className={layoutStyles.oneCol}>
              <div className={layoutStyles.region}>
                <Tags lang={language} data={node.relationships?.field_tags} />
              </div>
            </div>
          </div>
        </article>
        <FeatureImage media={node.relationships.field_media_image} />
        {/*
        {node.body ? (
          <div dangerouslySetInnerHTML={{ __html: node.body.processed }} />
        ) : null} */}
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
      created
      createdFormatted: created(formatString: "Do MMMM YYYY", locale: $language)
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
        uid {
          display_name
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
