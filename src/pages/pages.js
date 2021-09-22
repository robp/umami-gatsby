import React, { useContext, useEffect, useMemo } from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import { PageContext } from "../components/context/page-context"
import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"
import Link from "../components/link"

import { getDefaultTranslations } from "../utils/functions"

import { container } from "../styles/layout.module.scss"

const Page = ({ pageContext, data }) => {
  const { t, language, languages, originalPath } = useI18next()
  const { setStoredPageContext, setTranslations } = useContext(PageContext)

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

  const nodeTranslations = useMemo(
    () => getDefaultTranslations(languages, originalPath),
    [languages, originalPath]
  )

  useEffect(() => {
    setTranslations(nodeTranslations)
  }, [nodeTranslations, setTranslations])

  pageContext.crumbLabel = t("Pages")
  pageContext.title = t("Hi people")

  useEffect(() => {
    setStoredPageContext(pageContext)
  }, [pageContext, setStoredPageContext])

  return (
    <Layout>
      <Seo title={pageContext.crumbLabel} />
      <div className={container}>
        <h2>
          {t("Pages")} ({filteredPagesCount})
        </h2>
        <ul>{filteredPages()}</ul>
      </div>
    </Layout>
  )
}

export default Page

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
