import React from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import { usePageContext } from "../hooks/use-page-context"

import Layout from "../components/layout/layout-default"
import ContactForm from "../components/forms/contact"

const Page = ({ pageContext, data }) => {
  const { t } = useI18next()

  pageContext.crumbLabel = t("Contact")
  pageContext.title = t("Website feedback")
  usePageContext(pageContext)

  return (
    <Layout>
      <ContactForm />
    </Layout>
  )
}

export default Page

export { Head } from "./index"

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
