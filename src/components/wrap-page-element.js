import React from "react"
import PageContextProvider from "./context/page-context"

export const wrapPageElement = ({ element, props }) => (
  <PageContextProvider>
    {element}
  </PageContextProvider>
)
