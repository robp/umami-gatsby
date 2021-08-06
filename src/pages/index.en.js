import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PageTitle from "../components/page-title"
import Link from "../components/link"

const IndexPage = () => {
  const pages = useStaticQuery(graphql`
    query {
      allSitePage {
        edges {
          node {
            path
            id
          }
        }
        totalCount
      }
    }
  `)

  return (
    <Layout>
      <Seo title="Home" />
      <PageTitle title="Home" />

      <h2>Pages ({pages.allSitePage.totalCount})</h2>
      <ul>
        {pages.allSitePage.edges.map(edge => {
          return (
            <li key={edge.node.id}>
              <Link to={edge.node.path}>{edge.node.path}</Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default IndexPage
