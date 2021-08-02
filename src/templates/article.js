import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Tags from "../components/tags"

const Article = ({ data }) => {
  const node = data.nodeArticle
  const body = node.body ? node.body.processed : ""
  const image = getImage(
    node.relationships.field_media_image.relationships.field_media_image
      .localFile
  )

  return (
    <Layout>
      <Seo title={node.title} />
      <h1>{node.title}</h1>
      <Tags data={node.relationships.field_tags} />
      <GatsbyImage
        image={image}
        alt={node.relationships.field_media_image.field_media_image.alt}
        style={{ marginBottom: `1.45rem` }}
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
