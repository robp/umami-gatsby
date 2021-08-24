import React from "react"
import PropTypes from "prop-types"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Term from "../term"

import "../../styles/recipe-categories.scss"

function RecipeCategories({ lang, data }) {
  const { t } = useTranslation()

  const terms = data.length
    ? data.map(term => {
        return <Term lang={lang} key={term.id} {...term} />
      })
    : null

  if (terms) {
    return <div className="recipe-categories">{t("Recipe Categories")}: {terms}</div>
  }
  return null
}

RecipeCategories.propTypes = {
  lang: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}

export default RecipeCategories
