import * as React from "react"

import Region from "../region"
import LanguageSwitcherBlock from "../blocks/language-switcher"
import SearchBlock from "../blocks/search"
import AccountMenuBlock from "../blocks/account-menu"

import { styles } from "../../styles/regions/pre-header.module.scss"

const PreHeaderRegion = () => (
  <Region className={styles}>
    <LanguageSwitcherBlock />
    <SearchBlock />
    <AccountMenuBlock />
  </Region>
)

export default PreHeaderRegion
