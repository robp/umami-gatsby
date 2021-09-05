import React, { useContext } from "react"
import { useTranslation } from "react-i18next"

import { PageContext } from "../context/page-context"

import Block from "../block"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"

import * as styles from "../../styles/blocks/breadcrumb.module.scss"

const BreadcrumbBlock = () => {
  const { t } = useTranslation()
  const pageContext = useContext(PageContext)

  if (!pageContext?.breadcrumb) return null

  const crumbLabel = pageContext.title || t("Untitled")
  const {
    breadcrumb: { crumbs },
  } = pageContext

  return (
    <Block
      className={styles.block}
      locations={[/.*/]}
      locationsExcept={[/^\/$/]}
    >
      <Breadcrumb
        crumbs={crumbs.slice(1)}
        crumbSeparator=" » "
        crumbLabel={crumbLabel}
        disableLinks={[crumbs[crumbs.length - 1].pathname]}
        hiddenCrumbs={[
          "/en/tags",
          "/es/tags",
          "/en/recipe-category",
          "/es/recipe-category",
        ]}
      />
    </Block>
  )
}

export default BreadcrumbBlock
