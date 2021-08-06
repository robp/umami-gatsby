import React from "react"
import PropTypes from "prop-types"
import Link from "./link"

function Term({ lang, id, name, path }) {
  return (
    <div id={id} className="term">
      <Link to={`/${lang}${path.alias}`}>{name}</Link>
    </div>
  )
}

Term.propTypes = {
  lang: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.object.isRequired,
}

export default Term
