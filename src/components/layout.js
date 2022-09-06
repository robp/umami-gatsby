import React, { useContext } from "react"
import PropTypes from "prop-types"

import { PageContext } from "./context/page-context"

import LayoutDefault from "./layout/layout-default"

const Layout = ({ children }) => {
  const { storedPageContext } = useContext(PageContext)
  const layoutComponent = storedPageContext?.layout?.component

  const Layout = layoutComponent || LayoutDefault

  return <Layout>{children}</Layout>
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
