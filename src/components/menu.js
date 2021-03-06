import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import { removeTrailingSlash } from "../utils/functions"

import MenuItem from "./menu-item"

import * as styles from "../styles/menu.module.scss"

const Menu = ({
  childMenu = false,
  name,
  lang,
  depth = null,
  items,
  className,
  menuItemClassName,
  menuLinkClassName,
  activeTrailClassName,
  activeClassName,
  ...rest
}) => {
  // Callback for Array.filter() to remove empty elements.
  const filterEmpty = el => {
    return el !== null && el !== ""
  }
  const filterLang = item => {
    return item.node.langcode === lang
  }

  // this link will be active when itself or deeper routes are current
  const getPropsCallback = ({ href, location: { pathname } }) => {
    const re = new RegExp(`^${removeTrailingSlash(href)}`)
    const isPartialMatch = removeTrailingSlash(pathname).match(re)
    const isMatch = removeTrailingSlash(pathname) === removeTrailingSlash(href)
    return {
      className: classNames(
        menuLinkClassName,
        { [activeTrailClassName]: isPartialMatch },
        { [activeClassName]: isMatch }
      ),
    }
  }

  const getMenuItems = (parentId, currentDepth) => {
    return items.filter(filterLang).map(item => {
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
            menuItemClassName={menuItemClassName}
          />
        )
      }
      return null
    })
  }

  const getMenu = (parentId = null, currentDepth = 1) => {
    // Return if we've gone below the specified depth.
    if (currentDepth > depth) return

    const menuClass =
      currentDepth > 1 ? styles.submenu : classNames(styles.menu, className)
    const menuItems = getMenuItems(parentId, currentDepth).filter(filterEmpty)

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

  return getMenu()
}

Menu.propTypes = {
  childMenu: PropTypes.bool,
  name: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  depth: PropTypes.number,
  items: PropTypes.array.isRequired,
  className: PropTypes.string,
  menuItemClassName: PropTypes.string,
  menuLinkClassName: PropTypes.string,
  activeTrailClassName: PropTypes.string,
  activeClassName: PropTypes.string,
}

export default Menu
