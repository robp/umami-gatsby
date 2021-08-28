import * as React from "react"
import PropTypes from "prop-types"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { useTranslation } from "gatsby-plugin-react-i18next"
import classNames from "classnames"

import UserContextProvider from "./context/user-context"
import Header from "./layout/header"
import Highlighted from "./layout/highlighted"
import BannerTop from "./layout/banner-top"
import Main from "./layout/main"
import ContentBottom from "./layout/content-bottom"
import Footer from "./layout/footer"
import Bottom from "./layout/bottom"

import "../styles/_base.scss"
import { styles } from "../styles/main.module.scss"
import { container } from "../styles/layout.module.scss"

const Layout = ({ children }) => {
  const { t } = useTranslation()
  const { title } = useSiteMetadata()

  return (
    <UserContextProvider>
      <Header siteTitle={t(title || `Title`)} />
      <Highlighted />
      <BannerTop />
      <main className={classNames(styles, container)}>
        <Main>{children}</Main>
      </main>
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
