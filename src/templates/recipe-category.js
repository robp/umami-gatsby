import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import { usePageContext } from "../hooks/use-page-context"

import Seo from "../components/seo"
import RecipeCard from "../components/node/recipe-card"

import * as layoutStyles from "../styles/layout.module.scss"

const RecipeCategory = ({ pageContext, data }) => {
  const { t } = useTranslation()
  const node = data.node
  const nodeTranslations = data.nodeTranslations.edges

  pageContext.title = node.name
  usePageContext(pageContext, nodeTranslations)

  return (
    <div>
      <div className={layoutStyles.grid4}>
        {node.relationships?.node__recipe ? (
          <ul className={layoutStyles.list}>
            {node.relationships.node__recipe.map(node => {
              return (
                <li key={node.id} className={layoutStyles.item}>
                  <RecipeCard node={node} />
                </li>
              )
            })}
          </ul>
        ) : (
          `<p>${t("No recipes.")}</p>`
        )}
      </div>
    </div>
  )
}

RecipeCategory.propTypes = {
  data: PropTypes.object.isRequired,
}

export default RecipeCategory

export const Head = ({ location, data }) => (
  <Seo title={data.node.name} pathname={location.pathname} />
)

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
    node: taxonomyTermRecipeCategory(id: { eq: $nodeId }) {
      langcode
      id
      name
      path {
        alias
      }
      relationships {
        node__recipe {
          ...RecipeCard
        }
      }
    }
    nodeTranslations: allTaxonomyTermRecipeCategory(
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
