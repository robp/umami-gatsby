import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { PageContext } from "../components/context/page-context"
import Layout from "../components/layout/layout-node"
import Seo from "../components/seo"
import RecipeNode from "../components/node/recipe-node"

const Recipe = ({ pageContext, location, data }) => {
  const { setStoredPageContext, setTranslations } = useContext(PageContext)
  const node = data.nodeRecipe
  const nodeTranslations = data.allNodeRecipe.edges

  useEffect(() => {
    setTranslations(nodeTranslations)
  }, [nodeTranslations, setTranslations])

  pageContext.title = node.title

  useEffect(() => {
    setStoredPageContext(pageContext)
  }, [pageContext, setStoredPageContext])

  return (
    <Layout>
      <Seo title={node.title} description={node.field_summary.value} />
      <RecipeNode node={node} canonicalUrl={location.pathname} />
    </Layout>
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
