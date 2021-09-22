import React from "react"
import MessagesContextProvider from "./context/messages-context"
import UserContextProvider from "./context/user-context"

export const wrapRootElement = ({ element }) => (
  <UserContextProvider>
    <MessagesContextProvider>{element}</MessagesContextProvider>
  </UserContextProvider>
)
