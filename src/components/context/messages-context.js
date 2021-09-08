import React, { createContext, useState } from "react"
import PropTypes from "prop-types"

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
  children: PropTypes.node.isRequired,
}

export default MessagesContextProvider
