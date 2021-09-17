import React, { createContext, useReducer, useMemo } from "react"
import PropTypes from "prop-types"

const reducer = (state, action) => {
  if (action.type === "reset") {
    if (state.routes >= 1) return { messages: [], routes: 0 }
    else {
      state.routes++
      return state
    }
  }
  if (action.type === "addMessage") {
    const result = { ...state }
    result.messages.push(action.payload)
    result.routes = 0
    return result
  }
  return state
}

const initialState = {
  messages: [],
  routes: 0,
}

export const MessagesContext = createContext()

const MessagesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { messages } = state

  const addMessage = newMessage => {
    dispatch({ type: "addMessage", payload: newMessage })
  }

  const clearMessages = () => {
    dispatch({ type: "reset" })
  }

  const value = useMemo(
    () => ({
      messages,
      addMessage: newMessage => addMessage(newMessage),
      clearMessages: () => clearMessages(),
    }),
    [messages]
  )

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
