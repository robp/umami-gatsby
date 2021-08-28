import * as React from "react"
import PropTypes from "prop-types"

import Region from "../region"
import ContentBlock from "../blocks/content"

import { styles } from "../../styles/regions/content.module.scss"

const ContentRegion = ({ children }) => (
  <Region className={styles}>
    <ContentBlock>{children}</ContentBlock>
  </Region>
)

ContentRegion.propTypes = {
  children: PropTypes.node,
}

export default ContentRegion
