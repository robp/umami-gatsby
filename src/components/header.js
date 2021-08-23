import * as React from "react"
import PropTypes from "prop-types"

import LanguageSwitcher from "./language-switcher"
import SiteBranding from "./site-branding"
import MainMenuToggle from "./main-menu-toggle"
import MainMenu from "./main-menu"

import {
  styles,
  regionPreHeader,
  regionHeader,
} from "../styles/header.module.scss"

const Header = ({ siteTitle }) => (
  <header className={styles}>
    <div className={regionPreHeader}>
      <LanguageSwitcher />
    </div>
    <div className={regionHeader}>
      <SiteBranding siteTitle={siteTitle} />
      <MainMenuToggle />
      <MainMenu />
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
