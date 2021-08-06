import React from "react"
import PropTypes from "prop-types"

import MenuItem from "./menu-item"

import { menuStyles, submenuStyles } from "../styles/menu.module.scss"

const Menu = ({ childMenu = false, depth = null, name, items, ...rest }) => {
  // Callback for Array.filter() to remove empty elements.
  const filterEmpty = el => {
    return el !== null && el !== ""
  }

  // this link will be active when itself or deeper routes are current
  const getPropsCallback = ({ isPartiallyCurrent }) => {
    return isPartiallyCurrent ? { className: "active-trail" } : {}
  }

  const getItems = (parentId, currentDepth) => {
    return items.map(item => {
      if (item.node.parent === parentId || item.node.parent?.id === parentId) {
        return (
          <MenuItem
            key={item.node.id}
            id={item.node.id}
            href={item.node.url}
            getPropsCallback={getPropsCallback}
            title={item.node.title}
            getMenuCallback={getMenu}
            currentDepth={currentDepth}
          />
        )
      }
      return null
    })
  }

  const getMenu = (parentId = null, currentDepth = 1) => {
    // Return if we've gone below the specified depth.
    if (currentDepth > depth) return

    const menuClass = currentDepth > 1 ? submenuStyles : menuStyles
    const menuItems = getItems(parentId, currentDepth).filter(filterEmpty)

    if (menuItems.length) {
      return (
        <ul
          className={menuClass}
          aria-label={currentDepth > 1 ? "submenu" : null}
        >
          {menuItems}
        </ul>
      )
    }

    return null
  }

  const menu = getMenu()

  if (childMenu) {
    return menu
  }
  return (
    <nav role="navigation" {...rest}>
      {menu}
    </nav>
  )
}

Menu.propTypes = {
  childMenu: PropTypes.bool,
  depth: PropTypes.number,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  className: PropTypes.string,
}

export default Menu
