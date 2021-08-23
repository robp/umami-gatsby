import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import LanguageSwitcherContextProvider from "../components/context/language-switcher-context"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PageTitle from "../components/page-title"
import RecipeCategories from "../components/recipe-categories"
import Tags from "../components/tags"
import FeatureImage from "../components/feature-image"
import Ingredients from "../components/recipe/ingredients"
import Instructions from "../components/recipe/instructions"

const Recipe = ({ data }) => {
  const node = data.nodeRecipe
  const translations = data.allNodeRecipe.edges

  return (
    <LanguageSwitcherContextProvider translations={translations}>
      <Layout>
        <Seo
          lang={node.langcode}
          title={node.title}
          description={node.field_summary.value}
        />
        <PageTitle title={node.title} />
        <RecipeCategories
          lang={node.langcode}
          data={node.relationships.field_recipe_category}
        />
        <Tags lang={node.langcode} data={node.relationships.field_tags} />
        <FeatureImage media={node.relationships.field_media_image} />
        {node.field_summary ? (
          <div
            dangerouslySetInnerHTML={{ __html: node.field_summary.processed }}
          />
        ) : null}
        <Ingredients data={node.field_ingredients} />
        <Instructions data={node.field_recipe_instruction} />
      </Layout>
    </LanguageSwitcherContextProvider>
  )
}

Recipe.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Recipe

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
    nodeRecipe(id: { eq: $nodeId }) {
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
    allNodeRecipe(filter: { drupal_internal__nid: { eq: $internalNid } }) {
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
