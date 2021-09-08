import React, { createContext, useState } from "react"
import PropTypes from "prop-types"

export const MessagesContext = createContext()

const MessagesContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([])

  setMessages([
    {
      severity: "status",
      content: "Your message has been sent.",
    },
  ])

  return (
    <MessagesContext.Provider value={messages}>
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
