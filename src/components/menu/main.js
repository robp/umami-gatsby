import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Menu from "../menu"

const MainMenu = menu => {
  const menuItems = useStaticQuery(graphql`
    query {
      allMenuItems(
        filter: { menu_name: { eq: "main" }, parent: { id: { eq: null } } }
        sort: { order: ASC, fields: weight }
      ) {
        edges {
          node {
            title
            url
            id
            parent {
              id
            }
          }
        }
      }
    }
  `)

  return <Menu name="main" items={menuItems.allMenuItems.edges} />
}

export default MainMenu
