import * as React from "react"
import PropTypes from "prop-types"

import Region from "../region"
import SiteBranding from "../site-branding"
import MainMenuToggle from "../main-menu-toggle"
import MainMenu from "../main-menu"

import { styles } from "../../styles/regions/header.module.scss"

const HeaderRegion = ({ siteTitle }) => (
  <Region className={styles}>
    <SiteBranding siteTitle={siteTitle} />
    <MainMenuToggle />
    <MainMenu />
  </Region>
)

HeaderRegion.propTypes = {
  siteTitle: PropTypes.string,
}

HeaderRegion.defaultProps = {
  siteTitle: ``,
}

export default HeaderRegion
