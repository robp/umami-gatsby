import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Menu from "../menu"

import { styles } from "../../styles/main-menu.module.scss"

const MainMenu = menu => {
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
          }
        }
      }
    }
  `)

  return <Menu className={styles} name="main" depth={2} items={menuItems.allMenuItems.edges} />
}

export default MainMenu
