import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import PageContextProvider from "../components/context/page-context"
import LanguageSwitcherContextProvider from "../components/context/language-switcher-context"
import Layout from "../components/layout/layout-node"
import Seo from "../components/seo"
import ArticleNode from "../components/node/article-node"

const Article = ({ pageContext, location, data }) => {
  const node = data.nodeArticle
  const translations = data.allNodeArticle.edges

  pageContext.title = node.title

  return (
    <PageContextProvider pageContext={pageContext}>
      <LanguageSwitcherContextProvider translations={translations}>
        <Layout sidebar>
          <Seo title={node.title} />
          <ArticleNode node={node} canonicalUrl={location.pathname} />
        </Layout>
      </LanguageSwitcherContextProvider>
    </PageContextProvider>
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
