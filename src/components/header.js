import * as React from "react"
import PropTypes from "prop-types"

import LanguageSwitcher from "./language-switcher"
import SiteBranding from "./site-branding"
import MainMenuToggle from "./main-menu-toggle"
import MainMenu from "./main-menu"

import * as styles from "../styles/header.module.scss"
import { container } from "../styles/layout.module.scss"

const Header = ({ siteTitle }) => (
  <header className={styles.header}>
    <div className={container}>
      <div className={styles.header.regionPreHeader}>
        <LanguageSwitcher />
      </div>
      <div className={styles.header.regionHeader}>
        <SiteBranding siteTitle={siteTitle} />
        <MainMenuToggle />
        <MainMenu />
      </div>
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
