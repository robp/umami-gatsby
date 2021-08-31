import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"

import PageContextProvider from "../components/context/page-context"
import LanguageSwitcherContextProvider from "../components/context/language-switcher-context"

import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"
import RecipeCard from "../components/node/recipe-card"

import * as layoutStyles from "../styles/layout.module.scss"

const RecipeCategory = ({ pageContext, data }) => {
  const { t } = useTranslation()
  const node = data.taxonomyTermRecipeCategory
  const translations = data.allTaxonomyTermRecipeCategory.edges

  pageContext.pageTitle = node.name

  return (
    <PageContextProvider pageContext={pageContext}>
      <LanguageSwitcherContextProvider translations={translations}>
        <Layout title={node.name}>
          <Seo title={node.name} />
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
        </Layout>
      </LanguageSwitcherContextProvider>
    </PageContextProvider>
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
          ...RecipeCard
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
