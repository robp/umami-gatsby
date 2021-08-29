import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import LanguageSwitcherContextProvider from "../components/context/language-switcher-context"

import { normalizeString } from "../utils/functions"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Link from "../components/link"

const RecipeCategory = ({ data }) => {
  const { t } = useTranslation()

  const node = data.taxonomyTermRecipeCategory
  const translations = data.allTaxonomyTermRecipeCategory.edges

  const recipes = node.relationships.node__recipe ? (
    <>
      <h2>
        {t("Recipes")} ({node.relationships.node__recipe.length})
      </h2>
      <ul>
        {node.relationships.node__recipe.map(recipe => {
          return (
            <li key={recipe.id}>
              <Link
                to={`/${node.langcode}${normalizeString(recipe.path.alias)}`}
              >
                {recipe.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  ) : null

  return (
    <LanguageSwitcherContextProvider translations={translations}>
      <Layout title={`${t("Recipe Category")}: ${node.name}`}>
        <Seo title={`${t("Recipe Category")}: ${node.name}`} />
        {recipes}
      </Layout>
    </LanguageSwitcherContextProvider>
  )
}

RecipeCategory.propTypes = {
  data: PropTypes.object.isRequired,
}

export default RecipeCategory

export const query = graphql`
  query ($language: String!, $nodeId: String!, $internalTid: Int!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    taxonomyTermRecipeCategory(id: { eq: $nodeId }) {
      langcode
      id
      name
      path {
        alias
      }
      relationships {
        node__recipe {
          id
          title
          path {
            alias
          }
        }
      }
    }
    allTaxonomyTermRecipeCategory(
      filter: { drupal_internal__tid: { eq: $internalTid } }
    ) {
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
