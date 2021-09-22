import * as React from "react"
import PropTypes from "prop-types"

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

const Layout = ({ children, sidebar }) => {
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

Layout.propTypes = {
  children: PropTypes.node,
  sidebar: PropTypes.bool,
}

Layout.defaultProps = {
  sidebar: false,
}

export default Layout
