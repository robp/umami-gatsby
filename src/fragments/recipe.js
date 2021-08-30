import { graphql } from "gatsby"

export const RecipeFragments = graphql`
  fragment RecipeCard on node__recipe {
    langcode
    id
    path {
      alias
    }
    title
    field_difficulty
    ...RecipeCardImage
  }

  fragment RecipeCardSquare on node__recipe {
    langcode
    id
    path {
      alias
    }
    title
    field_difficulty
    ...RecipeCardImageSquare
  }

  fragment RecipeNode on node__recipe {
    langcode
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
      value
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
`
