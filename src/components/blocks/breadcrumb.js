import React from "react"

import Block from "../block"

import * as styles from "../../styles/blocks/breadcrumb.module.scss"

const BreadcrumbBlock = () => {
  return (
    <Block className={styles.block} locations={["*"]} locationsExcept={["/"]}>
    </Block>
  )
}

export default BreadcrumbBlock
