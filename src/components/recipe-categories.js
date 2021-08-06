import React from "react"
import PropTypes from "prop-types"

import Term from "./term"

function RecipeCategories({ lang, data }) {
  const terms = data.length
    ? data.map(term => {
        return <Term lang={lang} key={term.id} {...term} />
      })
    : null

  if (terms) {
    return <div className="recipe-categories">Recipe Categories: {terms}</div>
  }
  return null
}

RecipeCategories.propTypes = {
  lang: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}

export default RecipeCategories
