/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useSiteMetadata } from "../hooks/use-site-metadata"

import Header from "./header"
import Footer from "./footer"

import "../styles/_base.scss"
import "../styles/layout.scss"

const Layout = ({ children }) => {
  const { title } = useSiteMetadata()

  return (
    <>
      <Header siteTitle={title || `Title`} />
      <div className="container">
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
