import React from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import { usePageContext } from "../hooks/use-page-context"

import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"
import FrontpageBlock from "../components/blocks/frontpage"

const Page = ({ pageContext, data }) => {
  const { t } = useI18next()

  pageContext.title = t("Home")
  usePageContext(pageContext)

  return (
    <Layout>
      <FrontpageBlock />
    </Layout>
  )
}

export default Page

export const Head = ({ location, pageContext }) => (
  <Seo title={pageContext.title} pathname={location.pathname} />
)

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
