import * as React from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PageTitle from "../components/page-title"

import { container } from "../styles/layout.module.scss"
// import * as styles from "../styles/pages/index.module.scss"

const IndexPage = ({ data }) => {
  const { t } = useI18next()

  return (
    <Layout>
      <Seo title={t("Home")} />
      <div className={container}>
        <PageTitle title={t("Home")} className="visually-hidden" />
      </div>
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
