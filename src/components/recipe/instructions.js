import React from "react"
import PropTypes from "prop-types"

function Instructions({ data }) {
  return data ? (
    <div className="instructions">
      <h2>Instructions</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: data.processed,
        }}
      />
    </div>
  ) : null
}

Instructions.propTypes = {
  data: PropTypes.string.isRequired,
}

export default Instructions
