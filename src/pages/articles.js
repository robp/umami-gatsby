import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import { normalizeString } from "../utils/functions"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PageTitle from "../components/page-title"
import Link from "../components/link"

const ArticlesPage = ({ data }) => {
  const { t } = useTranslation()

  const nodeType = data.nodeTypeNodeType
  const articles = data.allNodeArticle.edges
  const articleCount = data.allNodeArticle.totalCount

  return (
    <Layout>
      <Seo title={t("Articles")} />
      <PageTitle title={t("Articles")} />

      {nodeType.description ? (
        <p
          dangerouslySetInnerHTML={{
            __html: nodeType.description,
          }}
        />
      ) : null}

      <h2>
        {t(data.nodeTypeNodeType.name)} ({articleCount})
      </h2>

      {articles ? (
        <ul>
          {articles.map(edge => {
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
        `<p>${t("No articles.")}</p>`
      )}
    </Layout>
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
    nodeTypeNodeType(drupal_internal__type: { eq: "article" }) {
      id
      name
      description
      drupal_internal__type
    }
    allNodeArticle(filter: { langcode: { eq: $language } }) {
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
  }
`
