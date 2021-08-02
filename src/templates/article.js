import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Img from "gatsby-image"

const Article = ({ data }) => {
  const node = data.nodeArticle
  const body = node.body ? node.body.processed : ""

  return (
    <Layout>
      <Seo title={node.title} />
      <h1>{node.title}</h1>
      <Img
        fluid={
          node.relationships.field_media_image.relationships.field_media_image
            .localFile.childImageSharp.fluid
        }
      />

      <img
        src={
          node.relationships.field_media_image.relationships.field_media_image
            .localFile.publicURL
        }
        alt={node.relationships.field_media_image.alt}
      />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </Layout>
  )
}

Article.propTypes = {
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query ($nodeId: String!) {
    nodeArticle(id: { eq: $nodeId }) {
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
                  fluid(maxWidth: 960) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
          field_media_image {
            alt
          }
        }
      }
    }
  }
`

export default Article
