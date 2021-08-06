import React from "react"
import PropTypes from "prop-types"

function Instructions({ data }) {
  if (data) {
    return (
      <div className="instructions">
        <h2>Instructions</h2>
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
