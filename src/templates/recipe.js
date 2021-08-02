import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Recipe = ({ data }) => {
  const node = data.nodeRecipe
  const field_summary = node.field_summary ? node.field_summary.processed : ""

  return (
    <Layout>
      <Seo title={node.title} />
      <h1>{node.title}</h1>
      <img
        src={
          node.relationships.field_media_image.relationships.field_media_image
            .localFile.publicURL
        }
        alt={node.relationships.field_media_image.alt}
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
                publicURL
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
