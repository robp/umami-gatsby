import React, { useContext, useEffect, useMemo } from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import { PageContext } from "../../components/context/page-context"
import Layout from "../../components/layout/layout-default"
import Seo from "../../components/seo"

import { getDefaultTranslations } from "../../utils/functions"

const Page = ({ pageContext, data }) => {
  const { t, languages, language, originalPath } = useI18next()
  const { setStoredPageContext, setTranslations, setLocalTasks } =
    useContext(PageContext)
  // const { isAuthenticated } = useContext(UserContext)

  const nodeTranslations = useMemo(
    () => getDefaultTranslations(languages, originalPath),
    [languages, originalPath]
  )

  useEffect(() => {
    setTranslations(nodeTranslations)
  }, [nodeTranslations, setTranslations])

  pageContext.title = t("Reset your password")

  useEffect(() => {
    setStoredPageContext(pageContext)
  }, [pageContext, setStoredPageContext])

  useEffect(() => {
    setLocalTasks([
      {
        node: {
          id: "log-in",
          title: t("Log in"),
          url: `/${language}/user/login`,
          parent: null,
          langcode: language,
        },
      },
      {
        node: {
          id: "reset-password",
          title: t("Reset your password"),
          url: `/${language}/user/password`,
          parent: null,
          langcode: language,
        },
      },
    ])
    return () => {
      setLocalTasks([])
    }
  }, [language, setLocalTasks, t])

  return (
    <Layout>
      <Seo title={pageContext.title} />
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
  }
`
