import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { PageContext } from "../components/context/page-context"
import Layout from "../components/layout/layout-node"
import Seo from "../components/seo"
import ArticleNode from "../components/node/article-node"

const Article = ({ pageContext, location, data }) => {
  const { setStoredPageContext, setTranslations } = useContext(PageContext)
  const node = data.nodeArticle
  const nodeTranslations = data.allNodeArticle.edges

  useEffect(() => {
    setTranslations(nodeTranslations)
  }, [nodeTranslations, setTranslations])

  pageContext.title = node.title

  useEffect(() => {
    setStoredPageContext(pageContext)
  }, [pageContext, setStoredPageContext])

  return (
    <Layout sidebar>
      <Seo title={node.title} />
      <ArticleNode node={node} canonicalUrl={location.pathname} />
    </Layout>
  )
}

Article.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Article

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
    nodeArticle(id: { eq: $nodeId }) {
      createdFormatted: created(formatString: "Do MMMM YYYY", locale: $language)
      ...ArticleNode
    }
    allNodeArticle(filter: { drupal_internal__nid: { eq: $internalNid } }) {
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
