import React from "react"
import PropTypes from "prop-types"
import { useTranslation } from "gatsby-plugin-react-i18next"

function Instructions({ data }) {
  const { t } = useTranslation()

  if (data) {
    return (
      <div className="instructions">
        <h2>{t("Instructions")}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: data.processed,
          }}
        />
      </div>
    )
  }
  return null
}

Instructions.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Instructions
