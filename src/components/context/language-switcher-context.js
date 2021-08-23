import React, { createContext } from "react"
import PropTypes from "prop-types"

export const LanguageSwitcherContext = createContext(null)

const LanguageSwitcherContextProvider = ({ translations, children }) => {
  return (
    <LanguageSwitcherContext.Provider value={translations}>
      {children}
    </LanguageSwitcherContext.Provider>
  )
}

LanguageSwitcherContextProvider.propTypes = {
  translations: PropTypes.array,
  children: PropTypes.node.isRequired,
}

LanguageSwitcherContextProvider.defaultProps = {
  translations: [],
}

export default LanguageSwitcherContextProvider
