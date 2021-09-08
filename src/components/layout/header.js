import * as React from "react"
import { SkipNavLink } from "@reach/skip-nav"

import PreHeaderRegion from "../regions/pre-header"
import HeaderRegion from "../regions/header"
import HighlightedRegion from "../regions/highlighted"

import "@reach/skip-nav/styles.css"
import { container } from "../../styles/layout.module.scss"
import { styles } from "../../styles/layout/header.module.scss"

const HeaderLayout = () => (
  <>
    <SkipNavLink />
    <header className={styles}>
      <div className={container}>
        <PreHeaderRegion />
        <HeaderRegion />
        <HighlightedRegion />
      </div>
    </header>
  </>
)

export default HeaderLayout
