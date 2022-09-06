import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { usePageContext } from "../hooks/use-page-context"

import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"
import ArticleCard from "../components/node/article-card"
import RecipeCard from "../components/node/recipe-card"

import * as layoutStyles from "../styles/layout.module.scss"

const Tag = ({ pageContext, data }) => {
  const { t } = useTranslation()
  const node = data.node
  const nodeTranslations = data.nodeTranslations.edges

  pageContext.title = node.name
  usePageContext(pageContext, nodeTranslations)

  const nodes = [
    ...(node.relationships?.node__article || []),
    ...(node.relationships?.node__recipe || []),
  ]

  // Sort nodes in DESC order.
  nodes.sort((a, b) => {
    return a.created < b.created ? 1 : -1
  })

  return (
    <Layout>
      <div>
        <div className={layoutStyles.grid4}>
          {nodes ? (
            <ul className={layoutStyles.list}>
              {nodes.map(node => {
                if (node.internal.type === "node__recipe") {
                  return (
                    <li key={node.id} className={layoutStyles.item}>
                      <RecipeCard node={node} />
                    </li>
                  )
                }
                return (
                  <li key={node.id} className={layoutStyles.item}>
                    <ArticleCard node={node} />
                  </li>
                )
              })}
            </ul>
          ) : (
            `<p>${t("No content.")}</p>`
          )}
        </div>
      </div>
    </Layout>
  )
}

Tag.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Tag

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
    node: taxonomyTermTags(id: { eq: $nodeId }) {
      langcode
      id
      name
      path {
        alias
      }
      relationships {
        node__article {
          ...ArticleCard
        }
        node__recipe {
          ...RecipeCard
        }
      }
    }
    nodeTranslations: allTaxonomyTermTags(
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
