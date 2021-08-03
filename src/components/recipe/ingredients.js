import React from "react"
import PropTypes from "prop-types"

function Ingredients({ data }) {
  return (
    <div className="ingredients">
      <h2>Ingredients</h2>
      <ul>
        {data.map((ingredient, index) => {
          return (
            <li key={`ingredient-${index}`}>
              {ingredient}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

Ingredients.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Ingredients
