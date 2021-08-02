import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

function Tag({ id, name, path }) {
  return (
    <div id={id} className="tag">
      <Link to={path.alias}>{name}</Link>
    </div>
  )
}

Tag.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.object.isRequired,
}

export default Tag
