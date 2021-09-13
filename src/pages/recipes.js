import React, { useContext, useEffect, useMemo } from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import { PageContext } from "../components/context/page-context"
import { LanguageSwitcherContext } from "../components/context/language-switcher-context"
import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"
import RecipeCard from "../components/node/recipe-card"

import { getDefaultTranslations } from "../utils/functions"

import * as layoutStyles from "../styles/layout.module.scss"

const Page = ({ pageContext, data }) => {
  const { t, languages, originalPath } = useI18next()
  const { setStoredPageContext } = useContext(PageContext)
  const { setTranslations } = useContext(LanguageSwitcherContext)
  const edges = data.allNodeRecipe.edges

  const nodeTranslations = useMemo(
    () => getDefaultTranslations(languages, originalPath),
    [languages, originalPath]
  )

  useEffect(() => {
    setTranslations(nodeTranslations)
  }, [nodeTranslations, setTranslations])

  pageContext.title = t("Recipes")

  useEffect(() => {
    setStoredPageContext(pageContext)
  }, [pageContext, setStoredPageContext])

  return (
    <Layout>
      <Seo title={pageContext.title} />
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
  )
}

export default Page

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
