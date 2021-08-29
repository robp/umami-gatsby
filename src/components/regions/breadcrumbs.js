import * as React from "react"

import Region from "../region"
import BreadcrumbBlock from "../blocks/breadcrumb"

import { styles } from "../../styles/regions/breadcrumbs.module.scss"

const BreadcrumbsRegion = () => (
  <Region className={styles}>
    <BreadcrumbBlock />
  </Region>
)

export default BreadcrumbsRegion
