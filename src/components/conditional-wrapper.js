import React from "react"
import PropTypes from "prop-types"

const ConditionalWrapper = ({ condition, wrapper, children }) => {
  return <>{condition ? wrapper(children) : children}</>
}

ConditionalWrapper.propTypes = {
  condition: PropTypes.bool,
  wrapper: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default ConditionalWrapper
