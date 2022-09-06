import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { usePageContext } from "../hooks/use-page-context"

import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"

const BasicPage = ({ pageContext, data }) => {
  const node = data.node
  const nodeTranslations = data.nodeTranslations.edges

  pageContext.title = node.title
  usePageContext(pageContext, nodeTranslations)

  return (
    <Layout>
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
    node: nodePage(id: { eq: $nodeId }) {
      langcode
      id
      title
      body {
        processed
      }
    }
    nodeTranslations: allNodePage(
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
