import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { UserStateContext } from "../components/user-context"

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

  const filteredPagesCount = () => {
    return (
      <UserStateContext.Consumer>
        {user => {
          const filterLang = edge => {
            return edge.node.path.split("/")[1] === user.locale
          }
          return pages.allSitePage.edges.filter(filterLang).length
        }}
      </UserStateContext.Consumer>
    )
  }

  const filteredPages = () => {
    return (
      <UserStateContext.Consumer>
        {user => {
          const filterLang = edge => {
            return edge.node.path.split("/")[1] === user.locale
          }
          return pages.allSitePage.edges.filter(filterLang).map(edge => {
            return (
              <li key={edge.node.id}>
                <Link to={edge.node.path}>{edge.node.path}</Link>
              </li>
            )
          })
        }}
      </UserStateContext.Consumer>
    )
  }

  return (
    <Layout>
      <Seo title="Hola gente" />
      <PageTitle title="Hola gente" />

      <h2>Paginas ({filteredPagesCount()})</h2>
      <ul>{filteredPages()}</ul>
    </Layout>
  )
}

export default IndexPage
