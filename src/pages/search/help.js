import React from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import { usePageContext } from "../../hooks/use-page-context"

import Layout from "../../components/layout/layout-default"
import Seo from "../../components/seo"

const Page = ({ pageContext, data }) => {
  const { t } = useI18next()

  pageContext.title = t("About searching")
  usePageContext(pageContext)

  return (
    <Layout>
      <Seo title={pageContext.title} />
      <div className="item-list">
        <ul>
          <li>{t("search.help.keywords")}</li>
          <li>{t("search.help.or")}</li>
          <li>{t("search.help.and")}</li>
          <li>{t("search.help.quotes")}</li>
          <li>{t("search.help.exclude")}</li>
        </ul>
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
  }
`
