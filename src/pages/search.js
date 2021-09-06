import * as React from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import PageContextProvider from "../components/context/page-context"
import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"
import SearchForm from "../components/forms/search"

import * as styles from "../styles/pages/search.module.scss"

const IndexPage = ({ pageContext, data }) => {
  const { t } = useI18next()

  pageContext.title = t("Search")

  return (
    <PageContextProvider pageContext={pageContext}>
      <Layout>
        <Seo title={t("Search")} />
        <SearchForm />
        <h2 className={styles.resultsHeading}>Search results</h2>
        <p>{t("Your search yielded no results.")}</p>
      </Layout>
    </PageContextProvider>
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
