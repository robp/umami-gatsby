import React, { useMemo, useState, useEffect } from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import algoliasearch from "algoliasearch/lite"

import PageContextProvider from "../components/context/page-context"
import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"
import SearchForm from "../components/forms/search"
import SearchResult from "../components/search/result"

import * as styles from "../styles/pages/search.module.scss"

const IndexPage = ({ pageContext, location, data }) => {
  const { t, language } = useI18next()
  const [results, setResults] = useState([])
  const [isLoading, setLoading] = useState(true)

  const searchClient = useMemo(
    () =>
      algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_KEY),
    []
  )
  const searchIndex = searchClient.initIndex(process.env.ALGOLIA_INDEX_NAME)
  const urlParams = new URLSearchParams(location.search)
  const keys = urlParams.get("keys")
  console.log("keys:", keys)

  useEffect(() => {
    doSearch()
  }, [location])

  const doSearch = () => {
    searchIndex
      .search(keys)
      // { filters: `langcode:${language}` }
      .then(({ hits }) => {
        console.log("hits:", hits)
        setResults(hits)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  pageContext.title = `${t("Search for")} ${keys}`

  console.log("results:", results)

  return (
    <PageContextProvider pageContext={pageContext}>
      <Layout>
        <Seo title={`${t("Search for")} ${keys}`} />
        <SearchForm keys={keys}/>
        <h2 className={styles.resultsHeading}>{t("Search results")}</h2>
        {isLoading ? (
          <p>{t("Loading...")}</p>
        ) : (
          <ol>
            {results.length ? (
              results.map(result => {
                return (
                  <li key={result.objectID}>
                    <SearchResult data={result} />
                  </li>
                )
              })
            ) : (
              <li>{t("Your search yielded no results.")}</li>
            )}
          </ol>
        )}
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
