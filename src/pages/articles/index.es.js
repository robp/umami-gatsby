import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { normalizeString } from "../../utils/functions"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import PageTitle from "../../components/page-title"
import Link from "../../components/link"

const ArticlesPage = () => {
  const pages = useStaticQuery(graphql`
    query {
      nodeTypeNodeType(drupal_internal__type: { eq: "article" }) {
        id
        name
        description
        drupal_internal__type
      }
      allNodeArticle(filter: { langcode: { eq: "es" } }) {
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
  `)

  return (
    <Layout>
      <Seo title="Articles" />
      <PageTitle title="Articles" />

      {pages.nodeTypeNodeType.description ? (
        <p
          dangerouslySetInnerHTML={{
            __html: pages.nodeTypeNodeType.description,
          }}
        />
      ) : null}

      <h2>
        {pages.nodeTypeNodeType.name} ({pages.allNodeArticle.totalCount})
      </h2>

      {pages.allNodeArticle.edges ? (
        <ul>
          {pages.allNodeArticle.edges.map(edge => {
            return (
              <li key={edge.node.id}>
                <Link to={`/${edge.node.langcode}${normalizeString(edge.node.path.alias)}`}>
                  {edge.node.title}
                </Link>
              </li>
            )
          })}
        </ul>
      ) : (
        "<p>No articles.</p>"
      )}
    </Layout>
  )
}

export default ArticlesPage
