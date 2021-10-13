import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { usePageContext } from "../hooks/use-page-context"

import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"

const BasicPage = ({ pageContext, data }) => {
  const node = data.nodePage
  const nodeTranslations = data.allNodePage.edges

  pageContext.title = node.title
  usePageContext(pageContext, nodeTranslations)

  return (
    <Layout>
      <Seo title={node.title} />
      {node.body ? (
        <div dangerouslySetInnerHTML={{ __html: node.body.processed }} />
      ) : null}
    </Layout>
  )
}

BasicPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default BasicPage

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
    nodePage(id: { eq: $nodeId }) {
      langcode
      id
      title
      body {
        processed
      }
    }
    allNodePage(filter: { drupal_internal__nid: { eq: $internalNid } }) {
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
