import React, { createContext, useReducer } from "react"
import PropTypes from "prop-types"

const initialState = {
  messages: [],
  routes: 0,
}

const reducer = (state, action) => {
  if (action.type === "reset") {
    if (state.routes > 0) {
      return {
        messages: [],
        routes: 0,
      }
    } else {
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

  const value = {
    messages,
    addMessage,
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
