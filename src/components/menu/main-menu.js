import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import Menu from "../menu"

import { styles } from "../../styles/main-menu.module.scss"

const MainMenu = menu => {
  const { language } = useI18next()

  const menuItems = useStaticQuery(graphql`
    query {
      allMenuItems(
        filter: { menu_name: { eq: "main" } }
        sort: { order: ASC, fields: weight }
      ) {
        edges {
          node {
            id
            title
            url
            parent {
              id
            }
            children {
              id
            }
            langcode
          }
        }
      }
    }
  `)

  return (
    <Menu
      className={styles}
      name="main"
      lang={language}
      depth={2}
      items={menuItems.allMenuItems.edges}
    />
  )
}

export default MainMenu
