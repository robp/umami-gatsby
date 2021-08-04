import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PageTitle from "../components/page-title"

const NodeType = ({ data }) => {
  const node = data.nodeTypeNodeType

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  console.log(data)
  const edges =
    data[`allNode${capitalizeFirstLetter(node.drupal_internal__type)}`].edges

  console.log(edges)
  const nodes = edges ? (
    <>
      <h2>
        {node.name} ({edges.length})
      </h2>
      <ul>
        {edges.map(edge => {
          return (
            <li key={edge.node.id}>
              <Link to={`/${edge.node.langcode}${edge.node.path.alias}`}>
                {edge.node.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  ) : null

  return (
    <Layout>
      <Seo title={`Node Type: ${node.name}`} />
      <PageTitle title={`Node Type: ${node.name}`} />
      {node.description ? (
        <p dangerouslySetInnerHTML={{ __html: node.description }} />
      ) : null}
      {nodes}
    </Layout>
  )
}

NodeType.propTypes = {
  data: PropTypes.object.isRequired,
}

/* We have to query all node types for now until we can figure out how to use
   some kind of a wildcard or filter. */
export const query = graphql`
  query ($nodeId: String!, $langcode: String!, $nodeType: String!) {
    nodeTypeNodeType(id: { eq: $nodeId }) {
      id
      name
      description
      drupal_internal__type
    }
    allNodeArticle(
      filter: {
        langcode: { eq: $langcode }
        internal: { type: { eq: $nodeType } }
      }
    ) {
      edges {
        node {
          id
          title
          path {
            alias
          }
          langcode
        }
      }
    }
    allNodePage(
      filter: {
        langcode: { eq: $langcode }
        internal: { type: { eq: $nodeType } }
      }
    ) {
      edges {
        node {
          id
          title
          path {
            alias
          }
          langcode
        }
      }
    }
    allNodeRecipe(
      filter: {
        langcode: { eq: $langcode }
        internal: { type: { eq: $nodeType } }
      }
    ) {
      edges {
        node {
          id
          title
          path {
            alias
          }
          langcode
        }
      }
    }
  }
`

export default NodeType
