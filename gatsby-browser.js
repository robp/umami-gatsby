/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
// import React from "react"
// import MessagesContextProvider from "./src/components/context/messages-context"
// import { MessagesContext } from "./src/components/context/messages-context"
import "@fontsource/open-sans/400.css"
import "@fontsource/open-sans/400-italic.css"
import "@fontsource/open-sans/700.css"
import "@fontsource/open-sans/700-italic.css"
import "@fontsource/scope-one/400.css"

export { wrapRootElement } from "./src/components/wrap-root-element"
export { wrapPageElement } from "./src/components/wrap-page-element"

export const onRouteUpdate = ({ location, prevLocation }) => {
  // const { messages, clearMessages } = useContext(MessagesContext)
  // console.log("new pathname", location.pathname)
  // console.log("old pathname", prevLocation ? prevLocation.pathname : null)
  // console.log(messages)
}
