import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

function Term({ id, name, path }) {
  return (
    <div id={id} className="term">
      <Link to={path.alias}>{name}</Link>
    </div>
  )
}

Term.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.object.isRequired,
}

export default Term
