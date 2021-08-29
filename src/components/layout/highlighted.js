import * as React from "react"

import HighlightedRegion from "../regions/highlighted"

import { container } from "../../styles/layout.module.scss"
import { styles } from "../../styles/layout/highlighted.module.scss"

const HighlightedLayout = () => {
  return (
    <div className={styles}>
      <div className={container}>
        <HighlightedRegion />
      </div>
    </div>
  )
}

export default HighlightedLayout
