import React from "react"
import PropTypes from "prop-types"

import Term from "./term"

function Tags({ data }) {
  const terms = data.length
    ? data
        .map(term => {
          return <Term key={term.id} {...term} />
        })
    : null

  return terms ? <div className="tags">Tags: {terms}</div> : null
}

Tags.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Tags
