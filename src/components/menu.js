import React from "react"
import PropTypes from "prop-types"

import Link from "./link"

import "../styles/menu.scss"

const Menu = ({ childMenu = false, depth = null, name, items }) => {
  // Callback for Array.filter() to remove empty elements.
  const filterEmpty = el => {
    return el !== null && el !== ""
  }

  const getMenu = (parentId = null, currentDepth = 1) => {
    // Return if we've gone below the specified depth.
    if (currentDepth > depth) return

    const menuClass = currentDepth > 1 ? "sub-menu" : "menu"
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

  // this link will be active when itself or deeper routes are current
  const getPropsCallback = ({ isPartiallyCurrent }) => {
    return isPartiallyCurrent ? { className: "active-trail" } : {}
  }

  const getItems = (parentId, currentDepth) => {
    return items.map(item => {
      if (item.node.parent === parentId || item.node.parent?.id === parentId) {
        return (
          <li key={item.node.id} className="menu-item">
            <Link
              to={item.node.url}
              activeClassName="active"
              getProps={getPropsCallback}
            >
              {item.node.title}
            </Link>
            {getMenu(item.node.id, currentDepth + 1)}
          </li>
        )
      }
      return null
    })
  }

  const menu = getMenu()

  if (childMenu) {
    return menu
  }
  return (
    <nav role="navigation" className={`menu--${name}`}>
      {menu}
    </nav>
  )
}

Menu.propTypes = {
  childMenu: PropTypes.bool,
  depth: PropTypes.number,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
}

export default Menu
