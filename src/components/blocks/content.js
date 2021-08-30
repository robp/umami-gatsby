import React from "react"
import PropTypes from "prop-types"

import Block from "../block"

import * as styles from "../../styles/blocks/content.module.scss"

const ContentBlock = ({ children }) => {
  return (
    <Block className={styles.block} locations={[/.*/]}>
      {children}
    </Block>
  )
}

ContentBlock.propTypes = {
  children: PropTypes.node,
}

export default ContentBlock
