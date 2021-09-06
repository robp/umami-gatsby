import * as React from "react"

import Region from "../region"
import SiteBrandingBlock from "../blocks/site-branding"
import MainMenuToggle from "../main-menu-toggle"
import MainMenuBlock from "../blocks/main-menu"

import { styles } from "../../styles/regions/header.module.scss"

const HeaderRegion = () => (
  <Region className={styles}>
    <SiteBrandingBlock />
    <MainMenuToggle />
    <MainMenuBlock />
  </Region>
)

export default HeaderRegion
