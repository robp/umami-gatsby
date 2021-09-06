import * as React from "react"

import Region from "../region"
import LanguageSwitcher from "../language-switcher"
import SearchBlock from "../blocks/search"
import AccountMenu from "../account-menu"

import { styles } from "../../styles/regions/pre-header.module.scss"

const PreHeaderRegion = () => (
  <Region className={styles}>
    <LanguageSwitcher />
    <SearchBlock />
    <AccountMenu />
  </Region>
)

export default PreHeaderRegion
