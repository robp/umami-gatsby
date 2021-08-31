import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import PageContextProvider from "../components/context/page-context"
import LanguageSwitcherContextProvider from "../components/context/language-switcher-context"
import Layout from "../components/layout/layout-node"
import Seo from "../components/seo"
import RecipeNode from "../components/node/recipe-node"

const Recipe = ({ pageContext, location, data }) => {
  const node = data.nodeRecipe
  const translations = data.allNodeRecipe.edges

  pageContext.pageTitle = node.title

  return (
    <PageContextProvider pageContext={pageContext}>
      <LanguageSwitcherContextProvider translations={translations}>
        <Layout title={node.title}>
          <Seo
            lang={node.langcode}
            title={node.title}
            description={node.field_summary.value}
          />
          <RecipeNode node={node} canonicalUrl={location.pathname} />
        </Layout>
      </LanguageSwitcherContextProvider>
    </PageContextProvider>
  )
}

Recipe.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Recipe

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
    nodeRecipe(id: { eq: $nodeId }) {
      ...RecipeNode
    }
    allNodeRecipe(filter: { drupal_internal__nid: { eq: $internalNid } }) {
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
