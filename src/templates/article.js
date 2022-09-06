import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { usePageContext } from "../hooks/use-page-context"

import LayoutNode from "../components/layout/layout-node"
import Seo from "../components/seo"
import ArticleNode from "../components/node/article-node"

const Article = ({ pageContext, location, data }) => {
  const node = data.node
  const nodeTranslations = data.nodeTranslations.edges

  pageContext.title = node.title
  pageContext.layout = {
    component: LayoutNode,
    sidebar: true,
  }
  usePageContext(pageContext, nodeTranslations)

  return <ArticleNode node={node} canonicalUrl={location.pathname} />
}

Article.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Article

export const Head = ({ location, data }) => (
  <Seo title={data.node.title} pathname={location.pathname} />
)

export const query = graphql`
  query ($language: String!, $nodeId: String!, $internalNid: Int!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    node: nodeArticle(id: { eq: $nodeId }) {
      createdFormatted: created(formatString: "Do MMMM YYYY", locale: $language)
      ...ArticleNode
    }
    nodeTranslations: allNodeArticle(
      filter: { drupal_internal__nid: { eq: $internalNid } }
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
