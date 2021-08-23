import * as React from "react"
import PropTypes from "prop-types"

import LanguageSwitcher from "./language-switcher"
import SiteBranding from "./site-branding"
import MainMenu from "./menu/main-menu"

import { styles } from "../styles/header.module.scss"

const Header = ({ siteTitle }) => (
  <header className={styles}>
    <div>
      <LanguageSwitcher />
      <SiteBranding siteTitle={siteTitle} />
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
