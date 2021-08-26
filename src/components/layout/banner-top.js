import * as React from "react"

import BannerTopRegion from "../regions/banner-top"

import { styles } from "../../styles/layout/banner-top.module.scss"

const BannerTop = () => {
  return (
    <div className={styles}>
      <BannerTopRegion />
    </div>
  )
}

export default BannerTop
