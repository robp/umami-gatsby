import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PageTitle from "../components/page-title"

const NodeType = ({ data }) => {
  const node = data.nodeTypeNodeType
  const dataNodes =
    data.nodeTypeNodeType.relationships[`node__${node.drupal_internal__type}`]

  const nodes = dataNodes ? (
    <>
      <h2>
        {node.name} ({dataNodes.length})
      </h2>
      <ul>
        {dataNodes.map(node => {
          return (
            <li key={node.id}>
              <Link to={node.path.alias}>{node.title}</Link>
            </li>
          )
        })}
      </ul>
    </>
  ) : (
    ""
  )

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
  query ($nodeId: String!) {
    nodeTypeNodeType(id: { eq: $nodeId }) {
      id
      name
      description
      drupal_internal__type
      relationships {
        node__article {
          id
          title
          path {
            alias
          }
        }
        node__page {
          id
          title
          path {
            alias
          }
        }
        node__recipe {
          id
          title
          path {
            alias
          }
        }
      }
    }
  }
`

export default NodeType
