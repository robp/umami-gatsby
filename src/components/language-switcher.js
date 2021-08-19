import React from "react"
import PropTypes from "prop-types"
import Link from "./link"
import { useI18next } from "gatsby-plugin-react-i18next"

import { normalizeString } from "../utils/functions"

import { styles } from "../styles/language-switcher.module.scss"

const LanguageSwitcher = ({ translations }) => {
  const { t, languages } = useI18next()

  let links = {}

  languages.forEach(langcode => {
    links[langcode] = {
      path: `/${langcode}`,
      title: t(langcode),
    }
  })

  translations.forEach(edge => {
    links[edge.node.langcode].path += normalizeString(edge.node.path.alias)
  })

  return (
    <div className={styles}>
      <ul>
        {languages.map(langcode => (
          <li>
            <Link to={links[langcode].path}>{links[langcode].title}</Link>
          </li>
        ))}
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
