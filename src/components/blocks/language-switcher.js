import React, { useContext, useMemo } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"

import { normalizeString, removeTrailingSlash } from "../../utils/functions"

import { PageContext } from "../../components/context/page-context"
import Block from "../block"
import Link from "../link"

import * as styles from "../../styles/blocks/language-switcher.module.scss"

const LanguageSwitcherBlock = () => {
  const { t, languages } = useI18next()
  let { translations } = useContext(PageContext)

  const defaultTranslations = useMemo(
    () =>
      languages.map(langcode => ({
        node: {
          langcode: langcode,
          path: {
            alias: `/`,
          },
        },
      })),
    [languages]
  )

  const theTranslations = translations?.length
    ? translations
    : defaultTranslations

  const getPropsCallback = ({ href, location: { pathname } }) => {
    const re = new RegExp(`^${removeTrailingSlash(href)}`)
    const isPartialMatch = removeTrailingSlash(pathname).match(re)
    return isPartialMatch ? { className: styles.activeTrail } : {}
  }

  return (
    <Block className={styles.block} locations={[/.*/]}>
      <ul>
        {theTranslations.map(edge => {
          return (
            <li key={edge.node.langcode}>
              <Link
                to={`${normalizeString(edge.node.path.alias)}`}
                language={edge.node.langcode}
                activeClassName={styles.active}
                getProps={getPropsCallback}
              >
                {t(edge.node.langcode)}
              </Link>
            </li>
          )
        })}
      </ul>
    </Block>
  )
}

export default LanguageSwitcherBlock
