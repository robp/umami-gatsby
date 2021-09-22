import React, { useContext, useEffect, useMemo } from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import { PageContext } from "../components/context/page-context"
import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"
import ContactForm from "../components/forms/contact"

import { getDefaultTranslations } from "../utils/functions"

const Page = ({ pageContext, data }) => {
  const { t, languages, originalPath } = useI18next()
  const { setStoredPageContext, setTranslations } = useContext(PageContext)

  const nodeTranslations = useMemo(
    () => getDefaultTranslations(languages, originalPath),
    [languages, originalPath]
  )

  useEffect(() => {
    setTranslations(nodeTranslations)
  }, [nodeTranslations, setTranslations])

  pageContext.crumbLabel = t("Contact")
  pageContext.title = t("Website feedback")

  useEffect(() => {
    setStoredPageContext(pageContext)
  }, [pageContext, setStoredPageContext])

  return (
    <Layout>
      <Seo title={pageContext.title} />
      <ContactForm />
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
