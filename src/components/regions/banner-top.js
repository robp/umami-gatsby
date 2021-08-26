import * as React from "react"

import Region from "../region"
import BannerBlock from "../blocks/banner"

import { styles } from "../../styles/regions/banner-top.module.scss"

const BannerTopRegion = () => (
  <Region className={styles}>
    <BannerBlock />
  </Region>
)

export default BannerTopRegion
