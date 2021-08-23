import React from "react"
import PropTypes from "prop-types"

import Link from "./link"

// import { styles } from "../styles/menu-item.module.scss"

const MenuItem = ({
  id,
  href,
  getPropsCallback,
  title,
  getMenuCallback,
  currentDepth,
  menuItemClassName,
}) => {
  return (
    <li key={id} className={menuItemClassName}>
      <Link to={href} activeClassName="is-active" getProps={getPropsCallback}>
        {title}
      </Link>
      {getMenuCallback(id, currentDepth + 1)}
    </li>
  )
}

MenuItem.propTypes = {
  id: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  getPropsCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
  getMenuCallback: PropTypes.func.isRequired,
  currentDepth: PropTypes.number.isRequired,
  menuItemClassName: PropTypes.string,
}

export default MenuItem
