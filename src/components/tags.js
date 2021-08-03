import React from "react"
import PropTypes from "prop-types"

import Term from "./term"

function Tags({ lang, data }) {
  const terms = data.length
    ? data
        .map(term => {
          return <Term lang={lang} key={term.id} {...term} />
        })
    : null

  return terms ? <div className="tags">Tags: {terms}</div> : null
}

Tags.propTypes = {
  lang: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}

export default Tags
