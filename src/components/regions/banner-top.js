import * as React from "react"

import Region from "../region"
import BannerBlock from "../blocks/banner"
import PromotedItemsBlock from "../blocks/promoted-items"

import { styles } from "../../styles/regions/banner-top.module.scss"

const BannerTopRegion = () => (
  <Region className={styles}>
    <BannerBlock />
    <PromotedItemsBlock />
  </Region>
)

export default BannerTopRegion
