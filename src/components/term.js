import React from "react"
import PropTypes from "prop-types"
import Link from "./link"

import { normalizeString } from "../utils/functions"

import "../styles/term.scss"

function Term({ lang, id, name, path }) {
  return (
    <div id={id} className="term">
      <Link to={`/${lang}${normalizeString(path.alias)}`}>{name}</Link>
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
