import React from "react"
import PropTypes from "prop-types"

import { Link } from "gatsby"

const Menu = ({ name, items }) => {
  return (
    <div className={`menu menu--${name}`}>
      <ul>
        {items.map(item => {
          return (
            <li key={item.node.id} className="menu-item">
              <Link to={item.node.url}>{item.node.title}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

Menu.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
}

export default Menu
