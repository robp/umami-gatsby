import React from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import PageContextProvider from "../components/context/page-context"
import LanguageSwitcherContextProvider from "../components/context/language-switcher-context"
import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"
import ContactForm from "../components/forms/contact"

const Page = ({ pageContext, data }) => {
  const { t, languages, originalPath } = useI18next()

  /**
   * @todo Use i18next to handle this, somehow.
   */
  const translations = []

  languages.forEach(langcode => {
    translations.push({
      node: {
        langcode,
        path: {
          alias: originalPath,
        },
      },
    })
  })

  pageContext.crumbLabel = t("Contact")
  pageContext.title = t("Website feedback")

  return (
    <PageContextProvider pageContext={pageContext}>
      <LanguageSwitcherContextProvider translations={translations}>
        <Layout>
          <Seo title={pageContext.title} />
          <ContactForm />
        </Layout>
      </LanguageSwitcherContextProvider>
    </PageContextProvider>
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
