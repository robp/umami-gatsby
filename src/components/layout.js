import * as React from "react"
import PropTypes from "prop-types"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { useTranslation } from "gatsby-plugin-react-i18next"

import UserContext from "./user-context"
import Header from "./header"
import Footer from "./footer"

import "../styles/_base.scss"
import { container } from "../styles/layout.module.scss"

const Layout = ({ translations, children }) => {
  const { t } = useTranslation()
  const { title } = useSiteMetadata()

  return (
    <UserContext>
      <Header translations={translations} siteTitle={t(title || `Title`)} />
      <div className={container}>
        <main>{children}</main>
        <Footer />
      </div>
    </UserContext>
  )
}

Layout.propTypes = {
  translations: PropTypes.array,
  children: PropTypes.node.isRequired,
}

export default Layout
