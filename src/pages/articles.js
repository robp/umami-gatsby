import React, { useContext, useEffect, useMemo } from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import { PageContext } from "../components/context/page-context"
import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"
import ArticleCard from "../components/node/article-card"

import { getDefaultTranslations } from "../utils/functions"

import * as layoutStyles from "../styles/layout.module.scss"

const Page = ({ pageContext, data }) => {
  const { t, languages, originalPath } = useI18next()
  const { setStoredPageContext, setTranslations } = useContext(PageContext)
  const edges = data.allNodeArticle.edges

  const nodeTranslations = useMemo(
    () => getDefaultTranslations(languages, originalPath),
    [languages, originalPath]
  )

  useEffect(() => {
    setTranslations(nodeTranslations)
  }, [nodeTranslations, setTranslations])

  pageContext.title = t("Articles")

  useEffect(() => {
    setStoredPageContext(pageContext)
  }, [pageContext, setStoredPageContext])

  return (
    <Layout>
      <Seo title={pageContext.title} />
      <div>
        <div className={layoutStyles.grid3}>
          {edges ? (
            <ul className={layoutStyles.list}>
              {edges.map(edge => {
                return (
                  <li key={edge.node.id} className={layoutStyles.item}>
                    <ArticleCard node={edge.node} />
                  </li>
                )
              })}
            </ul>
          ) : (
            `<p>${t("No articles.")}</p>`
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
    allNodeArticle(
      filter: { langcode: { eq: $language }, promote: { eq: true } }
      sort: { fields: [created, drupal_internal__nid], order: [DESC, ASC] }
    ) {
      edges {
        node {
          ...ArticleCard
        }
      }
    }
  }
`
