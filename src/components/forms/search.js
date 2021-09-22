import React, { useState, forwardRef, useImperativeHandle } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import { navigate } from "@reach/router"
import { StaticImage } from "gatsby-plugin-image"
import classNames from "classnames"

import Link from "../link"

import * as layoutStyles from "../../styles/layout.module.scss"
import * as styles from "../../styles/forms/search.module.scss"

const SearchForm = forwardRef((props, ref) => {
  const { t, language } = useI18next()
  const [query, setQuery] = useState("")

  useImperativeHandle(ref, () => {
    return {
      setQuery: setQuery,
    }
  })

  const doSearch = event => {
    event.preventDefault()
    navigate(`?keys=${query}`)
  }

  return (
    <form
      className={styles.form}
      method="get"
      id="search-form"
      acceptCharset="UTF-8"
      onSubmit={doSearch}
    >
      <div
        className={classNames(
          layoutStyles.containerInline,
          styles.containerInline,
          styles.formWrapper
        )}
        id="edit-basic"
      >
        <div className={styles.formTypeSearch}>
          <label htmlFor="edit-keys">{t("Enter your keywords")}</label>
          <input
            type="search"
            id="edit-keys"
            name="keys"
            value={query}
            onChange={e => setQuery(e.target.value)}
            size="30"
            maxLength="255"
            className={styles.formSearch}
          />
        </div>
        <input
          type="submit"
          name="op"
          value={t("Search")}
          className="button js-form-submit form-submit"
        />
        <div className={styles.algoliaAttribution}>
          <a
            href="https://www.algolia.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StaticImage
              src="../../images/search-by-algolia-light-background.svg"
              alt="Search by algolia"
              width={150}
              height={21}
            />
          </a>
        </div>
      </div>
      <Link
        to="/search/help"
        language={language}
        className={styles.searchHelpLink}
        id="edit-help-link"
      >
        {t("About searching")}
      </Link>
    </form>
  )
})

export default SearchForm
