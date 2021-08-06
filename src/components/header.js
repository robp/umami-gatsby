import * as React from "react"
import PropTypes from "prop-types"
import Link from "./link"

import LanguageSwitcher from "./language-switcher"
import MainMenu from "./menu/main-menu"

import "../styles/header.scss"

const Header = ({ siteTitle }) => (
  <header>
    <div>
      <LanguageSwitcher />
      <div className="site-title">
        <Link to="/">{siteTitle}</Link>
      </div>
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
