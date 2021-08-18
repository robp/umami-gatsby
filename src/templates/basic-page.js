import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PageTitle from "../components/page-title"
import Sections from "../components/sections"

const BasicPage = ({ data }) => {
  const node = data.nodePage
  const translations = data.allNodePage.edges

  return (
    <Layout translations={translations}>
      <Seo title={node.title} />
      <PageTitle title={node.title} />
      {node.body ? (
        <div dangerouslySetInnerHTML={{ __html: node.body.processed }} />
      ) : null}
      {node.relationships.field_sections ? (
        <Sections data={node.relationships.field_sections} />
      ) : null}
    </Layout>
  )
}

BasicPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default BasicPage

export const query = graphql`
  query ($nodeId: String!, $internalNid: Int!) {
    nodePage(id: { eq: $nodeId }) {
      langcode
      id
      title
      body {
        processed
      }
      relationships {
        field_sections {
          id
          field_number
          field_title
          field_body {
            processed
          }
        }
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
