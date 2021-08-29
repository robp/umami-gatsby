import * as React from "react"
import PropTypes from "prop-types"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { useTranslation } from "gatsby-plugin-react-i18next"

import UserContextProvider from "./context/user-context"
import Header from "./layout/header"
import HighlightedLayout from "./layout/highlighted"
import BannerTopLayout from "./layout/banner-top"
import BreadcrumbsLayout from "./layout/breadcrumbs"
import PageTitleLayout from "./layout/page-title"
import PageTitleBlock from "./blocks/page-title"
import ContentLayout from "./layout/content"
import ContentBottomLayout from "./layout/content-bottom"
import FooterLayout from "./layout/footer"
import BottomLayout from "./layout/bottom"

import "../styles/_base.scss"

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
