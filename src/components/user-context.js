import React from "react"
import PropTypes from "prop-types"
import { createContext } from "react"

export const UserStateContext = createContext(null)

const UserContext = ({ children }) => {
  const user = { }

  return (
    <UserStateContext.Provider value={user}>
      {children}
    </UserStateContext.Provider>
  )
}

UserContext.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserContext
