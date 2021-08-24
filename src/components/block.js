import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import * as styles from "../styles/block.module.scss"

const Block = ({ children, title, className }) => {
  return (
    <div className={classNames(styles.block, className)}>
      {title ? <h2>{title}</h2> : null}
      {children}
    </div>
  )
}

Block.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
}

export default Block
