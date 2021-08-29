import React from "react"
import PropTypes from "prop-types"
import Link from "./link"

import { normalizeString } from "../utils/functions"

import "../styles/term.module.scss"

function Term({ lang, id, name, path }) {
  return (
    <Link key={id} to={`/${lang}${normalizeString(path.alias)}`}>
      {name}
    </Link>
  )
}

Term.propTypes = {
  lang: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.object.isRequired,
}

export default Term
