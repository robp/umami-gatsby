import React from "react"
import PropTypes from "prop-types"
import Link from "./link"

import { normalizeString } from "../utils/functions"

import { styles } from "../styles/language-switcher.module.scss"

const LanguageSwitcher = ({ translations }) => {
  let links = {
    en: {
      path: "/en",
      title: "English",
    },
    es: {
      path: "/es",
      title: "Spanish",
    },
  }

  translations.forEach(edge => {
    links[edge.node.langcode].path += normalizeString(edge.node.path.alias)
  })

  return (
    <div className={styles}>
      <ul>
        <li>
          <Link to={links.en.path}>{links.en.title}</Link>
        </li>
        <li>
          <Link to={links.es.path}>{links.es.title}</Link>
        </li>
      </ul>
    </div>
  )
}

LanguageSwitcher.propTypes = {
  translations: PropTypes.array,
}

LanguageSwitcher.defaultProps = {
  translations: [],
}

export default LanguageSwitcher
