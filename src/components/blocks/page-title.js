import React from "react"
import PropTypes from "prop-types"

import Block from "../block"

import * as styles from "../../styles/blocks/page-title.module.scss"

function PageTitleBlock({ title, ...rest }) {
  return (
    <Block
      className={styles.block}
      locations={[/.*/]}
      locationsExcept={[/^\/$/]}
    >
      <h1 {...rest}>{title}</h1>
    </Block>
  )
}

PageTitleBlock.propTypes = {
  title: PropTypes.string.isRequired,
}

export default PageTitleBlock
