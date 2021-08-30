import * as React from "react"

import Region from "../region"
import ArticlesAsideBlock from "../blocks/articles-aside"

import { styles } from "../../styles/regions/sidebar.module.scss"

const SidebarRegion = () => (
  <Region className={styles}>
    <ArticlesAsideBlock />
  </Region>
)

export default SidebarRegion
