import React from "react"
import PropTypes from "prop-types"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Field from "../field"

import * as styles from "../../styles/recipe/ingredients.module.scss"

function Ingredients({ data }) {
  const { t } = useTranslation()

  return (
    <Field
      labelAbove
      label={t("Ingredients")}
      items={data}
      className={styles.field}
      labelClassName={styles.label}
      itemClassName={styles.item}
    />
  )
}

Ingredients.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Ingredients
