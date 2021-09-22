import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { PageContext } from "../components/context/page-context"
import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"

const BasicPage = ({ pageContext, data }) => {
  const { setStoredPageContext, setTranslations } = useContext(PageContext)
  const node = data.nodePage
  const nodeTranslations = data.allNodePage.edges

  useEffect(() => {
    setTranslations(nodeTranslations)
  }, [nodeTranslations, setTranslations])

  pageContext.title = node.title

  useEffect(() => {
    setStoredPageContext(pageContext)
  }, [pageContext, setStoredPageContext])

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
