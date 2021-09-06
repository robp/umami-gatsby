import React, { useRef } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { useI18next } from "gatsby-plugin-react-i18next"
import { navigate } from "gatsby"

import * as layoutStyles from "../../styles/layout.module.scss"
import * as styles from "../../styles/forms/search.module.scss"

const SearchForm = ({ keys }) => {
  const { path } = useI18next()

  const doSearch = event => {
    event.preventDefault()
    const data = new FormData(event.target)
    const keys = data.get("keys")
    navigate(`${event.target.action}?keys=${keys}`)
  }

  return (
    <form
      className={styles.form}
      data-drupal-selector="search-form"
      action="/en/search"
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
          <label htmlFor="edit-keys">Enter your keywords</label>
          <input
            data-drupal-selector="edit-keys"
            type="search"
            id="edit-keys"
            name="keys"
            defaultValue={keys}
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
          value="Search"
          className="button js-form-submit form-submit"
        />
      </div>
      <a
        href="/en/search/node/help"
        className={styles.searchHelpLink}
        data-drupal-selector="edit-help-link"
        id="edit-help-link"
      >
        About searching
      </a>
    </form>
  )
}

SearchForm.propTypes = {
  keys: PropTypes.string,
}

export default SearchForm
