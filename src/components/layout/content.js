import * as React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import ContentRegion from "../regions/content"
import SidebarRegion from "../regions/sidebar"

import { container } from "../../styles/layout.module.scss"
import * as mainStyles from "../../styles/main.module.scss"
import * as layoutStyles from "../../styles/layout.module.scss"
import * as contentStyles from "../../styles/layout/content.module.scss"
import * as sidebarStyles from "../../styles/layout/sidebar.module.scss"

const ContentLayout = ({ children, sidebar }) => {
  return (
    <main
      className={classNames(
        mainStyles.styles,
        container,
        { [layoutStyles.oneColumn]: !sidebar },
        { [layoutStyles.twoColumns]: sidebar }
      )}
    >
      <div className={classNames(contentStyles.styles, layoutStyles.content)}>
        <ContentRegion>{children}</ContentRegion>
      </div>
      {sidebar ? (
        <aside
          className={classNames(sidebarStyles.styles, layoutStyles.sidebar)}
        >
          <SidebarRegion />
        </aside>
      ) : null}
    </main>
  )
}

ContentLayout.propTypes = {
  children: PropTypes.node,
  sidebar: PropTypes.bool,
}

ContentLayout.defaultProps = {
  sidebar: false,
}

export default ContentLayout
