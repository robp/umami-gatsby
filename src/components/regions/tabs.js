import * as React from "react"

import Region from "../region"

import LocalTasksBlock from "../blocks/local-tasks"

import { styles } from "../../styles/regions/tabs.module.scss"

const TabsRegion = () => (
  <Region className={styles}>
    <LocalTasksBlock />
  </Region>
)

export default TabsRegion
