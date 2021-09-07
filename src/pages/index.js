import * as React from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import PageContextProvider from "../components/context/page-context"
import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"
import FrontpageBlock from "../components/blocks/frontpage"

const Page = ({ pageContext, data }) => {
  const { t } = useI18next()

  pageContext.title = t("Home")

  return (
    <PageContextProvider pageContext={pageContext}>
      <Layout>
        <Seo title={t("Home")} />
        <FrontpageBlock />
      </Layout>
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
