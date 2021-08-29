import * as React from "react"
import PropTypes from "prop-types"

import PageTitleRegion from "../regions/page-title"

import { container } from "../../styles/layout.module.scss"
import { styles } from "../../styles/layout/page-title.module.scss"

const PageTitleLayout = ({ children }) => {
  return (
    <div className={styles}>
      <div className={container}>
        <PageTitleRegion>{children}</PageTitleRegion>
      </div>
    </div>
  )
}

PageTitleLayout.propTypes = {
  children: PropTypes.node,
}

export default PageTitleLayout
