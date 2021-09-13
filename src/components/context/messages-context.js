import React, { createContext, useState } from "react"
import PropTypes from "prop-types"

export const MessagesContext = createContext({
  messages: [],
  addMessage: () => {},
  clearMessages: () => {},
})

const MessagesContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([])

  const addMessage = newMessage => {
    setMessages([...messages, newMessage])
  }

  const clearMessages = () => {
    setMessages([])
  }

  const value = {
    messages,
    addMessage: newMessage => addMessage(newMessage),
    clearMessages: () => clearMessages(),
  }

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  )
}

MessagesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MessagesContextProvider
