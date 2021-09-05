import * as React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import PageContextProvider from "../components/context/page-context"
import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"

import { container } from "../styles/layout.module.scss"

const NotFoundPage = ({ pageContext }) => {
  const { t } = useTranslation()

  pageContext.title = `404: ${t("Not found")}`

  return (
    <PageContextProvider pageContext={pageContext}>
      <Layout>
        <Seo title={`404: ${t("Not found")}`} />
        <div className={container}>
          <p>
            {t("You just hit a route that doesn&#39;t exist... the sadness.")}
          </p>
        </div>
      </Layout>
    </PageContextProvider>
  )
}

export default NotFoundPage

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
