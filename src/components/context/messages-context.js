import React, { createContext, useState } from "react"
import PropTypes from "prop-types"
import { MESSAGE_SEVERITY_STATUS } from "../message"

export const MessagesContext = createContext()

const MessagesContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([])

  return (
    <MessagesContext.Provider
      value={{
        messages,
        updateMessages: newMessages => setMessages(newMessages),
      }}
    >
      {children}
    </MessagesContext.Provider>
  )
}

MessagesContextProvider.propTypes = {
  // translations: PropTypes.array,
  children: PropTypes.node.isRequired,
}

MessagesContextProvider.defaultProps = {
  // translations: [],
}

export default MessagesContextProvider
