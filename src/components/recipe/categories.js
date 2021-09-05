import React from "react"
import PropTypes from "prop-types"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Term from "../term"
import Field from "../field"

function RecipeCategories({ lang, data }) {
  const { t } = useTranslation()

  const terms = []

  if (data?.length) {
    data.forEach(term => {
      terms.push(<Term lang={lang} key={term.id} {...term} />)
    })
  }

  return terms.length ? (
    <Field labelItems labelInline label={t("Recipe Category")} items={terms} />
  ) : null
}

RecipeCategories.propTypes = {
  lang: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}

export default RecipeCategories
