import React, { createContext } from "react"
import PropTypes from "prop-types"

export const PageContext = createContext()

const PageContextProvider = ({ pageContext, children }) => {
  // const [translations, setTranslations] = useState([])

  return (
    <PageContext.Provider value={pageContext}>{children}</PageContext.Provider>
  )
}

PageContextProvider.propTypes = {
  pageContext: PropTypes.object,
  children: PropTypes.node.isRequired,
}

PageContextProvider.defaultProps = {
  pageContext: {},
}

export default PageContextProvider
