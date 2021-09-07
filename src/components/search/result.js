import React from "react"
import PropTypes from "prop-types"

import Link from "../link"

import * as styles from "../../styles/search/result.module.scss"

const SearchResult = ({ data }) => {
  const { type, created, author, title, langcode, alias, _snippetResult } = data

  const formatDate = str => {
    const date = new Date(str)
    let month = `${date.getUTCMonth() + 1}`
    let day = `${date.getUTCDate()}`
    let year = date.getUTCFullYear()
    let hours = date.getUTCHours()
    let minutes = date.getUTCMinutes()

    if (month.length < 2) month = `0${month}`
    if (day.length < 2) day = `0${day}`
    if (hours.length < 2) hours = `0${hours}`
    if (minutes.length < 2) minutes = `0${minutes}`

    return `${[month, day, year].join("/")} - ${[hours, minutes].join(":")}`
  }

  const byline = (
    <>
      <span typeof="schema:Person" property="schema:name" datatype="">
        {author}
      </span>{" "}
      - {formatDate(created)}
    </>
  )

  return (
    <div className={styles.result}>
      <h3 className={styles.title}>
        <Link to={`/${langcode}${alias}`}>{title}</Link>
      </h3>
      <div className={styles.snippetInfo}>
        <div
          className={styles.snippet}
          dangerouslySetInnerHTML={{ __html: _snippetResult.excerpt.value }}
        />
        <div className={styles.info}>
          {type === "node__article" ? byline : null}
        </div>
      </div>
    </div>
  )
}

SearchResult.propTypes = {
  data: PropTypes.object.isRequired,
}

export default SearchResult
