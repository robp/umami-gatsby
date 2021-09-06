import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import Block from "../block"
import Menu from "../menu"

import * as styles from "../../styles/footer-menu.module.scss"

const FooterMenuBlock = menu => {
  const { t, language } = useI18next()

  const menuItems = useStaticQuery(graphql`
    query {
      allMenuItems(
        filter: { menu_name: { eq: "footer" } }
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
      title={t("Tell us what you think")}
      className={styles.block}
      locations={[/.*/]}
    >
      <Menu
        name="footer"
        lang={language}
        depth={1}
        items={menuItems.allMenuItems.edges}
        className={styles.menu}
        menuItemClassName={styles.menuItem}
        menuLinkClassName={styles.menuLink}
      />
    </Block>
  )
}

export default FooterMenuBlock
