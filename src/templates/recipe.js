import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Recipe = ({ data }) => {
  const node = data.nodeRecipe
  const field_summary = node.field_summary ? node.field_summary.processed : ""
  const image = getImage(
    node.relationships.field_media_image.relationships.field_media_image
      .localFile
  )

  return (
    <Layout>
      <Seo title={node.title} />
      <h1>{node.title}</h1>
      <GatsbyImage
        image={image}
        alt={node.relationships.field_media_image.field_media_image.alt}
        style={{ marginBottom: `1.45rem` }}
      />
      <div dangerouslySetInnerHTML={{ __html: field_summary }} />
    </Layout>
  )
}

Recipe.propTypes = {
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query ($nodeId: String!) {
    nodeRecipe(id: { eq: $nodeId }) {
      id
      title
      field_cooking_time
      field_difficulty
      field_ingredients
      field_number_of_servings
      field_preparation_time
      field_recipe_instruction {
        processed
      }
      field_summary {
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
      }
    }
  }
`

export default Recipe
