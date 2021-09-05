import * as React from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import PageContextProvider from "../components/context/page-context"
import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"
import Link from "../components/link"

import { container } from "../styles/layout.module.scss"

const IndexPage = ({ pageContext, data }) => {
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

  pageContext.title = t("Hi people")

  return (
    <PageContextProvider pageContext={pageContext}>
      <Layout>
        <Seo title={t("Home")} />
        <div className={container}>
          <h2>
            {t("Pages")} ({filteredPagesCount})
          </h2>
          <ul>{filteredPages()}</ul>
        </div>
      </Layout>
    </PageContextProvider>
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
