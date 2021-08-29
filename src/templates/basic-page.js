import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import LanguageSwitcherContextProvider from "../components/context/language-switcher-context"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Sections from "../components/sections"

const BasicPage = ({ data }) => {
  const node = data.nodePage
  const translations = data.allNodePage.edges

  return (
    <LanguageSwitcherContextProvider translations={translations}>
      <Layout title={node.title}>
        <Seo title={node.title} />
        {node.body ? (
          <div dangerouslySetInnerHTML={{ __html: node.body.processed }} />
        ) : null}
        {node.relationships?.field_sections ? (
          <Sections data={node.relationships.field_sections} />
        ) : null}
      </Layout>
    </LanguageSwitcherContextProvider>
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
      # relationships {
      #   field_sections {
      #     id
      #     field_number
      #     field_title
      #     field_body {
      #       processed
      #     }
      #   }
      # }
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
