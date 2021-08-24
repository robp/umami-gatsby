import * as React from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PageTitle from "../components/page-title"
import Link from "../components/link"

const IndexPage = ({ data }) => {
  const { t, language } = useI18next()

  const pages = data.allSitePage.edges

  const filterLang = edge => {
    return edge.node.path.split("/")[1] === language
  }

  const filteredPagesCount = pages.filter(filterLang).length

  const filteredPages = () => {
    return pages.filter(filterLang).map(edge => {
      return (
        <li key={edge.node.id}>
          <Link to={edge.node.path}>{edge.node.path}</Link>
        </li>
      )
    })
  }

  return (
    <Layout>
      <Seo title={t("Home")} />
      <PageTitle title={t("Hi people")} />

      <h2>
        {t("Pages")} ({filteredPagesCount})
      </h2>
      <ul>{filteredPages()}</ul>

    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
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
`
