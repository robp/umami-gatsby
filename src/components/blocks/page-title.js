import React, { useContext } from "react"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"

import { PageContext } from "../context/page-context"
import Block from "../block"

import * as styles from "../../styles/blocks/page-title.module.scss"

function PageTitleBlock({ title, ...rest }) {
  const { t } = useTranslation()
  const pageContext = useContext(PageContext)

  return (
    <Block
      className={styles.block}
      locations={[/.*/]}
      locationsExcept={[/^\/$/]}
      {...rest}
    >
      <h1>{title || pageContext?.title || t("Untitled")}</h1>
    </Block>
  )
}

PageTitleBlock.propTypes = {
  title: PropTypes.string,
}

export default PageTitleBlock
