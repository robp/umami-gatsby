import React from "react"
import MessagesContextProvider from "./context/messages-context"

export const wrapRootElement = ({ element }) => (
  <MessagesContextProvider>{element}</MessagesContextProvider>
)
