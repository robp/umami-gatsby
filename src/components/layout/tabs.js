import * as React from "react"

import TabsRegion from "../regions/tabs"

import { container } from "../../styles/layout.module.scss"
import { styles } from "../../styles/layout/tabs.module.scss"

const TabsLayout = () => {
  return (
    <div className={styles}>
      <div className={container}>
        <TabsRegion />
      </div>
    </div>
  )
}

export default TabsLayout
