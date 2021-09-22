import React, { createContext, useState } from "react"
import PropTypes from "prop-types"

export const LanguageSwitcherContext = createContext()

const LanguageSwitcherContextProvider = ({ children }) => {
  const [translations, setTranslations] = useState([])

  const value = {
    translations,
    setTranslations,
  }

  return (
    <LanguageSwitcherContext.Provider value={value}>
      {children}
    </LanguageSwitcherContext.Provider>
  )
}

LanguageSwitcherContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LanguageSwitcherContextProvider
