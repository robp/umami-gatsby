import React, { createContext } from "react"
import PropTypes from "prop-types"

export const LocationContext = createContext()

const LocationContextProvider = ({ location, children }) => {
  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  )
}

LocationContextProvider.propTypes = {
  location: PropTypes.object,
  children: PropTypes.node.isRequired,
}

LocationContextProvider.defaultProps = {
  location: {},
}

export default LocationContextProvider
