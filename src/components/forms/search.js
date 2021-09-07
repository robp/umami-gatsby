import React, { useState, forwardRef, useImperativeHandle } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import { navigate } from "@reach/router"
import { StaticImage } from "gatsby-plugin-image"
import classNames from "classnames"

import { Link } from "gatsby-plugin-react-i18next"

import * as layoutStyles from "../../styles/layout.module.scss"
import * as styles from "../../styles/forms/search.module.scss"

const SearchForm = forwardRef((props, ref) => {
  const { t, path } = useI18next()
  const [query, setQuery] = useState("")

  useImperativeHandle(ref, () => {
    return {
      setQuery: setQuery,
    }
  })

  const doSearch = event => {
    event.preventDefault()
    navigate(`${event.target.action}?keys=${query}`)
  }

  return (
    <form
      className={styles.form}
      data-drupal-selector="search-form"
      action={`/${path}`}
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
        data-drupal-selector="edit-basic"
        id="edit-basic"
      >
        <div className={styles.formTypeSearch}>
          <label htmlFor="edit-keys">{t("Enter your keywords")}</label>
          <input
            data-drupal-selector="edit-keys"
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
          data-drupal-selector="edit-submit"
          type="submit"
          id="edit-submit"
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
              width="150" height="21"
            />
          </a>
        </div>
      </div>
      <Link
        to="/search/help"
        className={styles.searchHelpLink}
        data-drupal-selector="edit-help-link"
        id="edit-help-link"
      >
        {t("About searching")}
      </Link>
    </form>
  )
})

export default SearchForm
