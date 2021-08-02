import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Sections from "../components/sections"

const BasicPage = ({ data }) => {
  const node = data.nodePage
  const body = node.body ? node.body.processed : ""

  return (
    <Layout>
      <Seo title={node.title} />
      <h1>{node.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Sections data={node.relationships.field_sections} />
    </Layout>
  )
}

BasicPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query ($nodeId: String!) {
    nodePage(id: { eq: $nodeId }) {
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
