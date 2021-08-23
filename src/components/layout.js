import * as React from "react"
import PropTypes from "prop-types"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { useTranslation } from "gatsby-plugin-react-i18next"

import UserContextProvider from "./context/user-context"
import Header from "./header"
import Footer from "./footer"

import "../styles/_base.scss"
import { container } from "../styles/layout.module.scss"

const Layout = ({ children }) => {
  const { t } = useTranslation()
  const { title } = useSiteMetadata()

  return (
    <UserContextProvider>
      <Header siteTitle={t(title || `Title`)} />
      <div className={container}>
        <main>{children}</main>
        <Footer />
      </div>
    </UserContextProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
