import React, { useContext } from "react"

import { PageContext } from "../context/page-context"

import Block from "../block"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"

import * as styles from "../../styles/blocks/breadcrumb.module.scss"

const BreadcrumbBlock = () => {
  const pageContext = useContext(PageContext)

  if (!pageContext) return null

  const {
    breadcrumb: { crumbs },
  } = pageContext

  console.log("Breadcumb pageContext:", pageContext)

  return (
    <Block
      className={styles.block}
      locations={[/.*/]}
      locationsExcept={[/^\/$/]}
    >
      <Breadcrumb crumbs={crumbs} crumbSeparator=" » " />
    </Block>
  )
}

export default BreadcrumbBlock
