import * as React from "react"

import ContentBottomRegion from "../regions/content-bottom"

import { styles } from "../../styles/layout/content-bottom.module.scss"

const ContentBottomLayout = () => {
  return (
    <div className={styles}>
      <ContentBottomRegion />
    </div>
  )
}

export default ContentBottomLayout
