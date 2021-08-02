import React from "react"
import PropTypes from "prop-types"

import Term from "./term"

function RecipeCategories({ data }) {
  console.log(data)
  const terms = data.length
    ? data
        .map(term => {
          return <Term key={term.id} {...term} />
        })
        .reduce((prev, curr) => [prev, ", ", curr])
    : null

  return terms ? (
    <div className="recipe-categories">Recipe Categories: {terms}</div>
  ) : null
}

RecipeCategories.propTypes = {
  data: PropTypes.array.isRequired,
}

export default RecipeCategories
