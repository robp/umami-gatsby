import React, { createContext } from "react"
import PropTypes from "prop-types"

export const LanguageSwitcherContext = createContext()

const LanguageSwitcherContextProvider = ({ translations, children }) => {
  // const [translations, setTranslations] = useState([])

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
