import * as React from "react"
import PropTypes from "prop-types"

import ContentRegion from "../regions/content"

import { styles } from "../../styles/layout/main.module.scss"

const Main = ({ children }) => {
  return (
    <div className={styles}>
      <ContentRegion>{children}</ContentRegion>
    </div>
  )
}

Main.propTypes = {
  children: PropTypes.node,
}

export default Main
