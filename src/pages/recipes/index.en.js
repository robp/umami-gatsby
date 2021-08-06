import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import PageTitle from "../../components/page-title"
import Link from "../../components/link"

const RecipesPage = () => {
  const results = useStaticQuery(graphql`
    query {
      nodeTypeNodeType(drupal_internal__type: { eq: "recipe" }) {
        id
        name
        description
        drupal_internal__type
      }
      allNodeRecipe(filter: { langcode: { eq: "en" } }) {
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
        totalCount
      }
      allTaxonomyTermRecipeCategory(filter: { langcode: { eq: "en" } }) {
        edges {
          node {
            id
            name
            path {
              alias
            }
            langcode
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Seo title="Recipes" />
      <PageTitle title="Recipes" />

      {results.nodeTypeNodeType.description ? (
        <p
          dangerouslySetInnerHTML={{
            __html: results.nodeTypeNodeType.description,
          }}
        />
      ) : null}

      <h2>Recipe Categories</h2>

      <div className="recipe-categories">
        <ul>
          {results.allTaxonomyTermRecipeCategory.edges?.map(edge => {
            return (
              <li key={edge.node.id}>
                <Link to={`/${edge.node.langcode}${edge.node.path.alias}`}>{edge.node.name}</Link>
              </li>
            )
          })}
        </ul>
      </div>

      <h2>
        {results.nodeTypeNodeType.name} ({results.allNodeRecipe.totalCount})
      </h2>

      {results.allNodeRecipe.edges ? (
        <ul>
          {results.allNodeRecipe.edges.map(edge => {
            return (
              <li key={edge.node.id}>
                <Link to={`/${edge.node.langcode}${edge.node.path.alias}`}>
                  {edge.node.title}
                </Link>
              </li>
            )
          })}
        </ul>
      ) : (
        "<p>No recipes.</p>"
      )}
    </Layout>
  )
}

export default RecipesPage
