import React from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import { usePageContext } from "../hooks/use-page-context"

import Layout from "../components/layout/layout-default"
import RecipeCard from "../components/node/recipe-card"

import * as layoutStyles from "../styles/layout.module.scss"

const Page = ({ pageContext, data }) => {
  const { t } = useI18next()
  const edges = data.nodes.edges

  pageContext.title = t("Recipes")
  usePageContext(pageContext)

  return (
    <Layout>
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

export { Head } from "./index"

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
    nodes: allNodeRecipe(
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
