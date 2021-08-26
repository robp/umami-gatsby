import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import { styles } from "../styles/region.module.scss"

const Region = ({ children, className }) => {
  return <div className={classNames(styles, className)}>{children}</div>
}

Region.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default Region
