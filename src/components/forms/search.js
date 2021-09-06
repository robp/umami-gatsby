import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import * as layoutStyles from "../../styles/layout.module.scss"
import * as styles from "../../styles/forms/search.module.scss"

const SearchForm = ({ query }) => {
  return (
    <form
      className={styles.form}
      data-drupal-selector="search-form"
      action="/en/search"
      method="post"
      id="search-form"
      accept-charset="UTF-8"
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
          <label for="edit-keys">Enter your keywords</label>
          <input
            data-drupal-selector="edit-keys"
            type="search"
            id="edit-keys"
            name="keys"
            value={query}
            size="30"
            maxlength="255"
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
  query: PropTypes.string,
}

export default SearchForm
