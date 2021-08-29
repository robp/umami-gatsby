import * as React from "react"
import PropTypes from "prop-types"
import { useSiteMetadata } from "../../hooks/use-site-metadata"
import { useTranslation } from "gatsby-plugin-react-i18next"

import UserContextProvider from "../context/user-context"
import Header from "./header"
import HighlightedLayout from "./highlighted"
import BannerTopLayout from "./banner-top"
import BreadcrumbsLayout from "./breadcrumbs"
import PageTitleLayout from "./page-title"
import PageTitleBlock from "../blocks/page-title"
import ContentLayout from "./content"
import ContentBottomLayout from "./content-bottom"
import FooterLayout from "./footer"
import BottomLayout from "./bottom"

import "../../styles/_base.scss"

const Layout = ({ children, title }) => {
  const { t } = useTranslation()
  const { siteTitle } = useSiteMetadata()

  return (
    <UserContextProvider>
      <Header siteTitle={t(siteTitle || `Title`)} />
      <HighlightedLayout />
      <BannerTopLayout />
      <BreadcrumbsLayout />
      <PageTitleLayout>
        <PageTitleBlock title={title} />
      </PageTitleLayout>
      <ContentLayout>{children}</ContentLayout>
      <ContentBottomLayout />
      <FooterLayout />
      <BottomLayout />
    </UserContextProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
}

export default Layout
