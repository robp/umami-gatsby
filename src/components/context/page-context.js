import React, { createContext, useState } from "react"
import PropTypes from "prop-types"

export const PageContext = createContext()

const PageContextProvider = ({ children }) => {
  const [storedPageContext, setStoredPageContext] = useState({})
  const [localTasks, setLocalTasks] = useState([])
  const [translations, setTranslations] = useState([])

  const value = {
    storedPageContext,
    setStoredPageContext,
    localTasks,
    setLocalTasks,
    translations,
    setTranslations,
  }

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

PageContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageContextProvider
