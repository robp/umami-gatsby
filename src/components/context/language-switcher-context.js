import React, { createContext, useState, useMemo } from "react"
import PropTypes from "prop-types"

export const LanguageSwitcherContext = createContext({
  translations: [],
  setTranslations: () => {},
})

const LanguageSwitcherContextProvider = ({ children }) => {
  const [translations, setTranslations] = useState([])

  const value = useMemo(
    () => ({
      translations,
      setTranslations: newTranslations => setTranslations(newTranslations),
    }),
    [translations]
  )

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
