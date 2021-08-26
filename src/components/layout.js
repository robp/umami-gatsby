import * as React from "react"
import PropTypes from "prop-types"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { useTranslation } from "gatsby-plugin-react-i18next"

import UserContextProvider from "./context/user-context"
import Header from "./layout/header"
import Highlighted from "./layout/highlighted"
import BannerTop from "./layout/banner-top"
import ContentBottom from "./layout/content-bottom"
import Footer from "./layout/footer"
import Bottom from "./layout/bottom"

import "../styles/_base.scss"

const Layout = ({ children }) => {
  const { t } = useTranslation()
  const { title } = useSiteMetadata()

  return (
    <UserContextProvider>
      <Header siteTitle={t(title || `Title`)} />
      <Highlighted />
      <BannerTop />
      <main>{children}</main>
      <ContentBottom />
      <Footer />
      <Bottom />
    </UserContextProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
