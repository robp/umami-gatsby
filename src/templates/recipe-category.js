import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PageTitle from "../components/page-title"

const RecipeCategory = ({ data }) => {
  const node = data.taxonomyTermRecipeCategory

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
      <Seo title={`Recipe Category: ${node.name}`} />
      <PageTitle title={`Recipe Category: ${node.name}`} />
      {recipes}
    </Layout>
  )
}

RecipeCategory.propTypes = {
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query ($nodeId: String!) {
    taxonomyTermRecipeCategory(id: { eq: $nodeId }) {
      id
      name
      path {
        alias
      }
      relationships {
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

export default RecipeCategory