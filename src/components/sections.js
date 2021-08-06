import React from "react"
import PropTypes from "prop-types"

import Section from "./section"

function Sections({ data }) {
  const sections = data.map(section => {
    return <Section key={section.id} {...section} />
  })

  if (sections.length) {
    return (
      <div className="sections">
        <h2>Sections</h2>
        {sections}
      </div>
    )
  }
  return null
}

Sections.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Sections
