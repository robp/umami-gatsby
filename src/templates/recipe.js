import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import LanguageSwitcherContextProvider from "../components/context/language-switcher-context"

import Layout from "../components/layout/layout-node"
import Seo from "../components/seo"
import RecipeCategories from "../components/recipe/categories"
import Tags from "../components/tags"
import MediaImage from "../components/media-image"
import Ingredients from "../components/recipe/ingredients"
import Instructions from "../components/recipe/instructions"

const Recipe = ({ data }) => {
  const node = data.nodeRecipe
  const translations = data.allNodeRecipe.edges

  return (
    <LanguageSwitcherContextProvider translations={translations}>
      <Layout title={node.title}>
        <Seo
          lang={node.langcode}
          title={node.title}
          description={node.field_summary.value}
        />
        <RecipeCategories
          lang={node.langcode}
          data={node.relationships.field_recipe_category}
        />
        <Tags lang={node.langcode} data={node.relationships.field_tags} />
        <MediaImage media={node.relationships.field_media_image} />
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
      ...RecipeNode
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
