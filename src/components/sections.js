import React from "react"
import PropTypes from "prop-types"

import Section from "./section"

function Sections({ data }) {
  const sections = data.map(section => {
    return <Section key={section.id} {...section} />
  })

  return (
    <div className="sections">
      <h2>Sections</h2>
      {sections}
    </div>
  )
}

Sections.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Sections
