import React from "react"
import PropTypes from "prop-types"
import Link from "./link"
import { useI18next } from "gatsby-plugin-react-i18next"

import { normalizeString } from "../utils/functions"

import { styles } from "../styles/language-switcher.module.scss"

const LanguageSwitcher = ({ translations }) => {
  const { t, language, languages } = useI18next()
  console.log(translations)

  const links = {}

  languages.forEach(langcode => {
    if (langcode !== language) {
      links[langcode] = {
        path: `/${langcode}`,
        title: t(langcode),
      }
    }
  })

  translations.forEach(edge => {
    if (edge.node.langcode !== language) {
      links[edge.node.langcode].path = `/${edge.node.langcode}${normalizeString(edge.node.path.alias)}`
    }
  })

  return (
    <div className={styles}>
      <ul>
        {Object.keys(links).map(langcode => (
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
