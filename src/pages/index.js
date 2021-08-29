import * as React from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import Layout from "../components/layout"
import Seo from "../components/seo"
import FrontpageBlock from "../components/blocks/frontpage"

const IndexPage = ({ data }) => {
  const { t } = useI18next()

  return (
    <Layout title={t("Home")}>
      <Seo title={t("Home")} />
      <FrontpageBlock />
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
  }
`
