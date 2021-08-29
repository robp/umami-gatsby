import * as React from "react"

import BreadcrumbsRegion from "../regions/breadcrumbs"

import { container } from "../../styles/layout.module.scss"
import { styles } from "../../styles/layout/breadcrumbs.module.scss"

const BreadcrumbsLayout = () => {
  return (
    <div className={styles}>
      <div className={container}>
        <BreadcrumbsRegion />
      </div>
    </div>
  )
}

export default BreadcrumbsLayout
