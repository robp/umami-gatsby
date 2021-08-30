import React from "react"
import PropTypes from "prop-types"
import { useTranslation } from "gatsby-plugin-react-i18next"
import classNames from "classnames"

import Field from "../field"

import * as styles from "../../styles/recipe/instructions.module.scss"

function Instructions({ data }) {
  const { t } = useTranslation()

  return (
    <Field
      labelAbove
      label={t("Recipe instruction")}
      className={classNames("clearfix", styles.field)}
      labelClassName={styles.label}
      itemClassName={styles.item}
    >
      <div dangerouslySetInnerHTML={{ __html: data?.processed }} />
    </Field>
  )
}

Instructions.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Instructions
