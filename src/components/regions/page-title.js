import * as React from "react"
import PropTypes from "prop-types"

import Region from "../region"

import { styles } from "../../styles/regions/page-title.module.scss"

const PageTitleRegion = ({ children }) => (
  <Region className={styles}>
    {children}
  </Region>
)

PageTitleRegion.propTypes = {
  children: PropTypes.node,
}

export default PageTitleRegion
