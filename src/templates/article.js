import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PageTitle from "../components/page-title"
import Tags from "../components/tags"
import FeatureImage from "../components/feature-image"

const Article = ({ data }) => {
  const node = data.nodeArticle

  return (
    <Layout>
      <Seo title={node.title} />
      <PageTitle title={node.title} />
      <Tags lang={node.langcode} data={node.relationships.field_tags} />
      <FeatureImage media={node.relationships.field_media_image} />
      {node.body ? (
        <div dangerouslySetInnerHTML={{ __html: node.body.processed }} />
      ) : null}
    </Layout>
  )
}

Article.propTypes = {
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query ($nodeId: String!) {
    nodeArticle(id: { eq: $nodeId }) {
      langcode
      id
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
  }
`

export default Article
