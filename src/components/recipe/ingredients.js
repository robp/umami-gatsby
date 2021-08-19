import React from "react"
import PropTypes from "prop-types"
import { useTranslation } from "gatsby-plugin-react-i18next"

function Ingredients({ data }) {
  const { t } = useTranslation()

  return (
    <div className="ingredients">
      <h2>{t("Ingredients")}</h2>
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
