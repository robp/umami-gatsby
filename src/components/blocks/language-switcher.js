import React, { useContext } from "react"
import Link from "../link"
import { useI18next } from "gatsby-plugin-react-i18next"
import { LanguageSwitcherContext } from "../context/language-switcher-context"

import { normalizeString } from "../../utils/functions"

import Block from "../block"

import { styles, activeTrail } from "../../styles/language-switcher.module.scss"

const LanguageSwitcherBlock = () => {
  const { t, languages } = useI18next()
  const translations =
    useContext(LanguageSwitcherContext) ||
    languages.map(langcode => {
      return {
        node: {
          langcode: langcode,
          path: {
            alias: `/`,
          },
        },
      }
    })

  // this link will be active when itself or deeper routes are current
  const getPropsCallback = ({ isPartiallyCurrent }) => {
    return isPartiallyCurrent ? { className: activeTrail } : {}
  }

  return (
    <Block className={styles} locations={[/.*/]}>
      <ul>
        {translations.map(edge => {
          return (
            <li key={edge.node.langcode}>
              <Link
                to={`/${edge.node.langcode}${normalizeString(
                  edge.node.path.alias
                )}`}
                activeClassName="active"
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
