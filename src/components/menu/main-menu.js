import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { UserStateContext } from "../user-context"

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
            langcode
          }
        }
      }
    }
  `)

  return (
    <UserStateContext.Consumer>
      {user => {
        return (
          <Menu
            className={styles}
            name="main"
            lang={user.locale}
            depth={2}
            items={menuItems.allMenuItems.edges}
          />
        )
      }}
    </UserStateContext.Consumer>
  )
}

export default MainMenu
