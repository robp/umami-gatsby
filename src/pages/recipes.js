import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import { normalizeString } from "../utils/functions"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PageTitle from "../components/page-title"
import Link from "../components/link"

const RecipesPage = ({ data }) => {
  const { t } = useTranslation()

  const nodeType = data.nodeTypeNodeType
  const recipeCategories = data.allTaxonomyTermRecipeCategory.edges
  const recipes = data.allNodeRecipe.edges
  const recipeCount = data.allNodeRecipe.totalCount

  return (
    <Layout>
      <Seo title={t("Recipes")} />
      <PageTitle title={t("Recipes")} />

      {nodeType.description ? (
        <p
          dangerouslySetInnerHTML={{
            __html: nodeType.description,
          }}
        />
      ) : null}

      <h2>{t("Recipe Categories")}</h2>

      <div className="recipe-categories">
        <ul>
          {recipeCategories?.map(edge => {
            return (
              <li key={edge.node.id}>
                <Link
                  to={`/${edge.node.langcode}${normalizeString(
                    edge.node.path.alias
                  )}`}
                >
                  {edge.node.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <h2>
        {t(data.nodeTypeNodeType.name)} ({recipeCount})
      </h2>

      {recipes ? (
        <ul>
          {recipes.map(edge => {
            return (
              <li key={edge.node.id}>
                <Link
                  to={`/${edge.node.langcode}${normalizeString(
                    edge.node.path.alias
                  )}`}
                >
                  {edge.node.title}
                </Link>
              </li>
            )
          })}
        </ul>
      ) : (
        `<p>${t("No recipes.")}</p>`
      )}
    </Layout>
  )
}

export default RecipesPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    nodeTypeNodeType(drupal_internal__type: { eq: "recipe" }) {
      id
      name
      description
      drupal_internal__type
    }
    allNodeRecipe(filter: { langcode: { eq: $language } }) {
      edges {
        node {
          id
          title
          path {
            alias
          }
          langcode
        }
      }
      totalCount
    }
    allTaxonomyTermRecipeCategory(filter: { langcode: { eq: $language } }) {
      edges {
        node {
          id
          name
          path {
            alias
          }
          langcode
        }
      }
    }
  }
`
