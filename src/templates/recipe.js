import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { usePageContext } from "../hooks/use-page-context"

import LayoutNode from "../components/layout/layout-node"
import Seo from "../components/seo"
import RecipeNode from "../components/node/recipe-node"

const Recipe = ({ pageContext, location, data }) => {
  const node = data.node
  const nodeTranslations = data.nodeTranslations.edges

  pageContext.title = node.title
  usePageContext(pageContext, nodeTranslations)

  return <RecipeNode node={node} canonicalUrl={location.pathname} />
}

Recipe.propTypes = {
  data: PropTypes.object.isRequired,
}

Recipe.layout = {
  component: LayoutNode,
}

export default Recipe

export const Head = ({ location, data }) => (
  <Seo
    title={data.node.title}
    description={data.node.field_summary.value}
    pathname={location.pathname}
  />
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
    node: nodeRecipe(id: { eq: $nodeId }) {
      ...RecipeNode
    }
    nodeTranslations: allNodeRecipe(
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
