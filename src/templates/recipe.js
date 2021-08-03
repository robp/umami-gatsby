import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PageTitle from "../components/page-title"
import RecipeCategories from "../components/recipe-categories"
import Tags from "../components/tags"
import FeatureImage from "../components/feature-image"

const Recipe = ({ data }) => {
  const node = data.nodeRecipe

  return (
    <Layout>
      <Seo title={node.title} />
      <PageTitle title={node.title} />
      <RecipeCategories data={node.relationships.field_recipe_category} />
      <Tags data={node.relationships.field_tags} />
      <FeatureImage media={node.relationships.field_media_image} />
      {node.field_summary ? (
        <div
          dangerouslySetInnerHTML={{ __html: node.field_summary.processed }}
        />
      ) : null}
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
        field_recipe_category {
          id
          name
          path {
            alias
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

export default Recipe
