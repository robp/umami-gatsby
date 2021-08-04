import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import PageTitle from "../../components/page-title"

const RecipesPage = () => {
  const pages = useStaticQuery(graphql`
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
    }
  `)

  return (
    <Layout>
      <Seo title="Recipes" />
      <PageTitle title="Recipes" />

      {pages.nodeTypeNodeType.description ? (
        <p dangerouslySetInnerHTML={{ __html: pages.nodeTypeNodeType.description }} />
      ) : null}

      <h2>
        {pages.nodeTypeNodeType.name} ({pages.allNodeRecipe.totalCount})
      </h2>

      {pages.allNodeRecipe.edges ? (
          <ul>
            {pages.allNodeRecipe.edges.map(edge => {
              return (
                <li key={edge.node.id}>
                  <Link to={`/${edge.node.langcode}${edge.node.path.alias}`}>{edge.node.title}</Link>
                </li>
              )
            })}
          </ul>
        )
      : '<p>No recipes.</p>'}
    </Layout>
  )
}

export default RecipesPage
