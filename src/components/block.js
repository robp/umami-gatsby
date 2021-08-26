import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { useI18next } from "gatsby-plugin-react-i18next"

import { styles } from "../styles/block.module.scss"

const Block = ({ children, title, className, locations }) => {
  const { originalPath } = useI18next()

  // Display the block if no locations are provided, or if the current
  // originalPath matches one of the locations provided.
  const display = !locations || locations.indexOf(originalPath) !== -1

  return display ? (
    <div className={classNames(styles, className)}>
      {title ? <h2>{title}</h2> : null}
      {children}
    </div>
  ) : null
}

Block.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  locations: PropTypes.array,
}

export default Block
