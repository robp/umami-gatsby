import * as React from "react"
import PropTypes from "prop-types"
import { useSiteMetadata } from "../hooks/use-site-metadata"

import UserContext from "./user-context"
import Header from "./header"
import Footer from "./footer"

import "../styles/_base.scss"
import { container } from "../styles/layout.module.scss"

const Layout = ({ children }) => {
  const { title } = useSiteMetadata()

  return (
    <UserContext>
      <Header siteTitle={title || `Title`} />
      <div className={container}>
        <main>{children}</main>
        <Footer />
      </div>
    </UserContext>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
