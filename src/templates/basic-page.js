import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PageTitle from "../components/page-title"
import Sections from "../components/sections"

const BasicPage = ({ data }) => {
  const node = data.nodePage

  return (
    <Layout>
      <Seo lang={node.langcode} title={node.title} />
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

export const query = graphql`
  query ($nodeId: String!) {
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
  }
`

export default BasicPage
