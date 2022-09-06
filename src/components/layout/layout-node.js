import React, { useContext } from "react"
import PropTypes from "prop-types"

import { PageContext } from "../context/page-context"

import Header from "./header"
import HighlightedLayout from "./highlighted"
import TabsLayout from "./tabs"
import BannerTopLayout from "./banner-top"
import BreadcrumbsLayout from "./breadcrumbs"
import ContentLayout from "./content"
import ContentBottomLayout from "./content-bottom"
import FooterLayout from "./footer"
import BottomLayout from "./bottom"

import "../../styles/_base.scss"

const LayoutNode = ({ children }) => {
  const { storedPageContext } = useContext(PageContext)
  const sidebar = storedPageContext?.layout?.sidebar

  return (
    <>
      <Header />
      <HighlightedLayout />
      <TabsLayout />
      <BannerTopLayout />
      <BreadcrumbsLayout />
      <ContentLayout sidebar={sidebar}>{children}</ContentLayout>
      <ContentBottomLayout />
      <FooterLayout />
      <BottomLayout />
    </>
  )
}

LayoutNode.propTypes = {
  children: PropTypes.node,
}

export default LayoutNode
