import React, { useContext } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"

import { PageContext } from "../context/page-context"

import Block from "../block"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"

import * as styles from "../../styles/blocks/breadcrumb.module.scss"

const BreadcrumbBlock = () => {
  const { t, languages } = useI18next()
  const { storedPageContext } = useContext(PageContext)

  if (!storedPageContext?.breadcrumb) return null

  const {
    breadcrumb: { crumbs },
  } = storedPageContext

  // Slice off the first crumb `/` since we'll have a language crumb for the
  // homepage
  const breadcrumbs = crumbs.slice(1)
  const crumbSeparator = " » "
  const crumbLabel =
    storedPageContext.crumbLabel || storedPageContext.title || t("Untitled")
  // Don't generate a link for the last crumb (the current page)
  const disableLinks = [crumbs[crumbs.length - 1].pathname]
  const hiddenPaths = ["tags", "recipe-category"]
  const hiddenCrumbs = []

  // Populate hiddenCrumbs array of paths that we do not want to see
  // breadcrumbs included for.
  languages.forEach(langcode => {
    hiddenPaths.forEach(path => {
      hiddenCrumbs.push(`/${langcode}/${path}`)
    })
  })

  return (
    <Block
      className={styles.block}
      locations={[/.*/]}
      locationsExcept={[/^\/$/]}
    >
      <Breadcrumb
        crumbs={breadcrumbs}
        crumbSeparator={crumbSeparator}
        crumbLabel={crumbLabel}
        disableLinks={disableLinks}
        hiddenCrumbs={hiddenCrumbs}
      />
    </Block>
  )
}

export default BreadcrumbBlock
