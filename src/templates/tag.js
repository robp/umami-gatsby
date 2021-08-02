import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Tag = ({ data }) => {
  const node = data.taxonomyTermTags

  const articles = node.relationships.node__article ? (
    <>
      <h2>Articles ({node.relationships.node__article.length})</h2>
      <ul>
        {node.relationships.node__article.map(article => {
          return (
            <li key={article.id}>
              <Link to={article.path.alias}>{article.title}</Link>
            </li>
          )
        })}
      </ul>
    </>
  ) : (
    ""
  )

  const recipes = node.relationships.node__recipe ? (
    <>
      <h2>Recipes ({node.relationships.node__recipe.length})</h2>
      <ul>
        {node.relationships.node__recipe.map(recipe => {
          return (
            <li key={recipe.id}>
              <Link to={recipe.path.alias}>{recipe.title}</Link>
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
      <Seo title={`Tag: ${node.name}`} />
      <h1>{node.name}</h1>
      {articles}
      {recipes}
    </Layout>
  )
}

Tag.propTypes = {
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query ($nodeId: String!) {
    taxonomyTermTags(id: { eq: $nodeId }) {
      id
      name
      path {
        alias
      }
      relationships {
        node__article {
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

export default Tag
