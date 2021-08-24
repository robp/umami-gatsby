import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import { styles } from "../styles/block.module.scss"

const Block = ({ children, title, className }) => {
  if (title) {
  }
  return (
    <div className={classNames(styles, className)}>
      {title ? <h2 className={styles.title}>{title}</h2> : null}
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
