import * as React from "react"
import PropTypes from "prop-types"

import PreHeaderRegion from "../regions/pre-header"
import HeaderRegion from "../regions/header"
import HighlightedRegion from "../regions/highlighted"

import { container } from "../../styles/layout.module.scss"
import { styles } from "../../styles/layout/header.module.scss"

const Header = ({ siteTitle }) => (
  <header className={styles}>
    <div className={container}>
      <PreHeaderRegion />
      <HeaderRegion siteTitle={siteTitle} />
      <HighlightedRegion />
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
