import React from "react"
import LanguageSwitcherContextProvider from "./context/language-switcher-context"
import PageContextProvider from "./context/page-context"

export const wrapPageElement = ({ element, props }) => (
  <PageContextProvider>
    <LanguageSwitcherContextProvider>{element}</LanguageSwitcherContextProvider>
  </PageContextProvider>
)
