import React, { createContext } from "react"
import PropTypes from "prop-types"

export const UserContext = createContext(null)

const UserContextProvider = ({ children }) => {
  const user = { }

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserContextProvider
