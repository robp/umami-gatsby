import React, { useContext, useRef, useMemo, useState, useEffect } from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import algoliasearch from "algoliasearch/lite"

import { PageContext } from "../../components/context/page-context"
import Layout from "../../components/layout/layout-default"
import Seo from "../../components/seo"
import SearchForm from "../../components/forms/search"
import SearchResult from "../../components/search/result"

import { getDefaultTranslations } from "../../utils/functions"

import * as styles from "../../styles/pages/search.module.scss"

const Page = ({ pageContext, location, data }) => {
  const { t, languages, originalPath, language } = useI18next()
  const { setStoredPageContext, setTranslations } = useContext(PageContext)
  const searchFormRef = useRef()
  const [results, setResults] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [keys, setKeys] = useState("")

  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )
  const searchIndex = useMemo(
    () => searchClient.initIndex(process.env.GATSBY_ALGOLIA_INDEX_NAME),
    [searchClient]
  )

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    setKeys(urlParams.get("keys"))
  }, [location])

  useEffect(() => {
    const doSearch = () => {
      if (keys?.length) {
        searchIndex
          .search(keys, {
            facetFilters: [`langcode:${language}`],
          })
          .then(({ hits }) => {
            setResults(hits)
            setLoading(false)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        setResults([])
        setLoading(false)
      }
    }
    searchFormRef.current.setQuery(keys)
    doSearch()
  }, [keys, language, searchIndex])

  const resultsLoading = (
    <h3 className={styles.noResultsHeading}>{t("Loading...")}</h3>
  )
  const noResults = (
    <h3 className={styles.noResultsHeading}>
      {t("Your search yielded no results.")}
    </h3>
  )
  const resultsHeading = (
    <h2 className={styles.resultsHeading}>{t("Search results")}</h2>
  )

  const renderedResults = results.length ? (
    <>
      {resultsHeading}
      <ol className={styles.searchResults}>
        {results.map(result => {
          return (
            <li key={result.objectID}>
              <SearchResult data={result} />
            </li>
          )
        })}
      </ol>
    </>
  ) : (
    noResults
  )

  const nodeTranslations = useMemo(
    () => getDefaultTranslations(languages, originalPath),
    [languages, originalPath]
  )

  useEffect(() => {
    setTranslations(nodeTranslations)
  }, [nodeTranslations, setTranslations])

  if (keys?.length) {
    pageContext.title = `${t("Search for")} ${keys}`
  } else {
    pageContext.title = t("Search")
  }

  useEffect(() => {
    setStoredPageContext(pageContext)
  }, [pageContext, setStoredPageContext])

  return (
    <Layout>
      <Seo title={pageContext.title} />
      <SearchForm ref={searchFormRef} />
      {isLoading ? resultsLoading : renderedResults}
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
