import React, { createContext, useReducer } from "react"
import PropTypes from "prop-types"

const initialState = {
  currentMessages: [],
  queuedMessages: [],
  routes: 0,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState
    case "addMessage":
      const queuedMessages = state.queuedMessages
      queuedMessages.push(action.payload)
      return {
        ...state,
        queuedMessages: queuedMessages,
      }
    case "updateMessages":
      return {
        ...state,
        currentMessages: state.queuedMessages,
        queuedMessages: [],
        routes: 0,
      }
    default:
      throw new Error("Unexpected action type")
  }
}

export const MessagesContext = createContext()

const MessagesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addMessage = newMessage => {
    dispatch({ type: "addMessage", payload: newMessage })
  }

  const clearMessages = () => {
    dispatch({ type: "reset" })
  }

  const updateMessages = () => {
    dispatch({ type: "updateMessages" })
  }

  const value = {
    messages: state.currentMessages,
    addMessage,
    updateMessages,
    clearMessages,
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
