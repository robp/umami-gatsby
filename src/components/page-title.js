import React from "react"
import PropTypes from "prop-types"

function PageTitle({ title, ...rest }) {
  return <h1 {...rest}>{title}</h1>
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

export default PageTitle
