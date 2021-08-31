import React from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import PageContextProvider from "../components/context/page-context"
import LanguageSwitcherContextProvider from "../components/context/language-switcher-context"

import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"
import ArticleCard from "../components/node/article-card"

import * as layoutStyles from "../styles/layout.module.scss"

const ArticlesPage = ({ pageContext, data }) => {
  const { t, languages, originalPath } = useI18next()
  const edges = data.allNodeArticle.edges

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

  return (
    <PageContextProvider pageContext={pageContext}>
      <LanguageSwitcherContextProvider translations={translations}>
        <Layout title={t("Articles")}>
          <Seo title={t("Articles")} />
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
      </LanguageSwitcherContextProvider>
    </PageContextProvider>
  )
}

export default ArticlesPage

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
