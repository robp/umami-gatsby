import * as React from "react"

import Region from "../region"
import LanguageSwitcher from "../language-switcher"

import { styles } from "../../styles/regions/pre-header.module.scss"

const PreHeaderRegion = () => (
  <Region className={styles}>
    <LanguageSwitcher />
  </Region>
)

export default PreHeaderRegion
