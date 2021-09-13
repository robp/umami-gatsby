import React, { createContext, useState, useMemo } from "react"
import PropTypes from "prop-types"

export const PageContext = createContext({
  storedPageContext: {},
  setStoredPageContext: () => {},
})

const PageContextProvider = ({ children }) => {
  const [storedPageContext, setStoredPageContext] = useState({})

  const value = useMemo(
    () => ({
      storedPageContext,
      setStoredPageContext: newPageContext =>
        setStoredPageContext(newPageContext),
    }),
    [storedPageContext]
  )

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

PageContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageContextProvider
