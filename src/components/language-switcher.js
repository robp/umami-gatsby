import React from "react"
import Link from "./link"
import { useI18next } from "gatsby-plugin-react-i18next"
import { LanguageSwitcherContext } from "./context/language-switcher-context"

import { normalizeString } from "../utils/functions"

import { styles } from "../styles/language-switcher.module.scss"

const LanguageSwitcher = () => {
  const { t, languages, language } = useI18next()

  const defaultTranslations = languages.map(langcode => {
    return {
      node: {
        langcode: langcode,
        path: {
          alias: `/`,
        },
      },
    }
  })


  return (
    <LanguageSwitcherContext.Consumer>
      {translations => {
        if (!translations) {
          translations = defaultTranslations
        }
        return (
          <div className={styles}>
            <ul>
              {translations.map(edge => {
                return (edge.node.langcode !== language) ? (
                  <li>
                    <Link to={`/${edge.node.langcode}${normalizeString(edge.node.path.alias)}`}>{t(edge.node.langcode)}</Link>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        )
      }}
    </LanguageSwitcherContext.Consumer>
  )
}

export default LanguageSwitcher
