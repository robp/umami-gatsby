import React from "react"
import LanguageSwitcherContextProvider from "./context/language-switcher-context"
import LocalTasksContextProvider from "./context/local-tasks-context"
import PageContextProvider from "./context/page-context"

export const wrapPageElement = ({ element, props }) => (
  <PageContextProvider>
    <LocalTasksContextProvider>
      <LanguageSwitcherContextProvider>
        {element}
      </LanguageSwitcherContextProvider>
    </LocalTasksContextProvider>
  </PageContextProvider>
)
