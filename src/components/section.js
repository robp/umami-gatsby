import React from "react"
import PropTypes from "prop-types"

function Section({ id, field_number, field_title, field_body }) {
  const body = field_body ? field_body.processed : ""

  return (
    <div id={id} className="section">
      <div className="field_number">{field_number}</div>
      <h3 className="field_title">{field_title}</h3>
      <div
        className="field_body"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  )
}

Section.propTypes = {
  id: PropTypes.string.isRequired,
  field_number: PropTypes.string.isRequired,
  field_title: PropTypes.string.isRequired,
  field_body: PropTypes.object,
}

export default Section
