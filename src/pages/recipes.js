import React from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import PageContextProvider from "../components/context/page-context"
import LanguageSwitcherContextProvider from "../components/context/language-switcher-context"
import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"
import RecipeCard from "../components/node/recipe-card"

import * as layoutStyles from "../styles/layout.module.scss"

const RecipesPage = ({ pageContext, data }) => {
  const { t, languages, originalPath } = useI18next()
  const edges = data.allNodeRecipe.edges

  /**
   * @todo Use i18next to handle this, somehow.
   */
  const translations = []

  languages.forEach(langcode => {
    translations.push({
      node: {
        langcode,
        path: {
          alias: originalPath,
        },
      },
    })
  })

  pageContext.title = t("Recipes")

  return (
    <PageContextProvider pageContext={pageContext}>
      <LanguageSwitcherContextProvider translations={translations}>
        <Layout>
          <Seo title={t("Recipes")} />
          <div>
            <div className={layoutStyles.grid4}>
              {edges ? (
                <ul className={layoutStyles.list}>
                  {edges.map(edge => {
                    return (
                      <li key={edge.node.id} className={layoutStyles.item}>
                        <RecipeCard node={edge.node} />
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
    allNodeRecipe(
      filter: { langcode: { eq: $language }, promote: { eq: true } }
      sort: { fields: [created, drupal_internal__nid], order: [DESC, ASC] }
    ) {
      edges {
        node {
          ...RecipeCard
        }
      }
    }
  }
`
