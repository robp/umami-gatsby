import React from "react"
import PageContextProvider from "./context/page-context"
import LanguageSwitcherContextProvider from "./context/language-switcher-context"

export const wrapPageElement = ({ element, props }) => (
  <PageContextProvider>
    <LanguageSwitcherContextProvider>{element}</LanguageSwitcherContextProvider>
  </PageContextProvider>
)
