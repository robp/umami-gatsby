import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import Block from "../block"
import Menu from "../menu"

import * as styles from "../../styles/blocks/main-menu.module.scss"

const MainMenuBlock = menu => {
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
    <Block
      element="nav"
      className={styles.block}
      locations={[/.*/]}
      role="navigation"
      data-gatsby-selector="menu-main"
    >
      <Menu
        menuItemClassName={styles.menuItem}
        menuLinkClassName={styles.menuLink}
        activeTrailClassName={styles.activeTrail}
        activeClassName={styles.active}
        name="main"
        lang={language}
        depth={1}
        items={menuItems.allMenuItems.edges}
      />
    </Block>
  )
}

export default MainMenuBlock
