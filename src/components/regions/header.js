import * as React from "react"

import Region from "../region"
import SiteBranding from "../site-branding"
import MainMenuToggle from "../main-menu-toggle"
import MainMenu from "../main-menu"

import { styles } from "../../styles/regions/header.module.scss"

const HeaderRegion = () => (
  <Region className={styles}>
    <SiteBranding />
    <MainMenuToggle />
    <MainMenu />
  </Region>
)

export default HeaderRegion
