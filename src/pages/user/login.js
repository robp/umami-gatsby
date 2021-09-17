import React, { useContext, useEffect, useMemo } from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import { PageContext } from "../../components/context/page-context"
import { LanguageSwitcherContext } from "../../components/context/language-switcher-context"
import Layout from "../../components/layout/layout-default"
import Seo from "../../components/seo"
import LoginForm from "../../components/forms/login"

import { getDefaultTranslations } from "../../utils/functions"

const Page = ({ pageContext, data }) => {
  const { t, languages, originalPath } = useI18next()
  const { setStoredPageContext } = useContext(PageContext)
  const { setTranslations } = useContext(LanguageSwitcherContext)

  const nodeTranslations = useMemo(
    () => getDefaultTranslations(languages, originalPath),
    [languages, originalPath]
  )

  useEffect(() => {
    setTranslations(nodeTranslations)
  }, [nodeTranslations, setTranslations])

  pageContext.title = t("Log in")

  useEffect(() => {
    setStoredPageContext(pageContext)
  }, [pageContext, setStoredPageContext])

  return (
    <Layout>
      <Seo title={pageContext.title} />
      <LoginForm />
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
