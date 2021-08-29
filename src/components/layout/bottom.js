import * as React from "react"

import BottomRegion from "../regions/bottom"

import { container } from "../../styles/layout.module.scss"
import { styles } from "../../styles/layout/bottom.module.scss"

const BottomLayout = () => {
  return (
    <div className={styles}>
      <div className={container}>
        <BottomRegion />
      </div>
    </div>
  )
}

export default BottomLayout
