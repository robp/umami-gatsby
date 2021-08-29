import * as React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import ContentRegion from "../regions/content"

import { container } from "../../styles/layout.module.scss"
import { styles } from "../../styles/layout/content.module.scss"
import * as mainStyles from "../../styles/main.module.scss"

const ContentLayout = ({ children }) => {
  return (
    <main className={classNames(mainStyles.styles, container)}>
      <div className={styles}>
        <ContentRegion>{children}</ContentRegion>
      </div>
    </main>
  )
}

ContentLayout.propTypes = {
  children: PropTypes.node,
}

export default ContentLayout
