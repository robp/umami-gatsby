import React, { useContext } from "react"
import PropTypes from "prop-types"

import { PageContext } from "../context/page-context"

import Header from "./header"
import HighlightedLayout from "./highlighted"
import TabsLayout from "./tabs"
import BannerTopLayout from "./banner-top"
import BreadcrumbsLayout from "./breadcrumbs"
import PageTitleLayout from "./page-title"
import PageTitleBlock from "../blocks/page-title"
import ContentLayout from "./content"
import ContentBottomLayout from "./content-bottom"
import FooterLayout from "./footer"
import BottomLayout from "./bottom"

import "../../styles/_base.scss"

const LayoutDefault = ({ children, sidebar = false }) => {
  return (
    <>
      <Header />
      <HighlightedLayout />
      <TabsLayout />
      <BannerTopLayout />
      <BreadcrumbsLayout />
      <PageTitleLayout>
        <PageTitleBlock />
      </PageTitleLayout>
      <ContentLayout sidebar={sidebar}>{children}</ContentLayout>
      <ContentBottomLayout />
      <FooterLayout />
      <BottomLayout />
    </>
  )
}

LayoutDefault.propTypes = {
  children: PropTypes.node,
  sidebar: PropTypes.bool,
}

export default LayoutDefault
