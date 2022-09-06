import React, { cloneElement } from "react"
import PageContextProvider from "./context/page-context"

import Layout from "./layout"

export const wrapPageElement = ({ element, props }) => {
  /**
   * Wrap our elements with the I18nextProvider so that we have i18n
   * context in our components
   * @see https://andremonteiro.pt/gatsby-i18next-wrap-page-element/
   */
  const wrapper = (
    <PageContextProvider>
      <Layout>{element.props.children.props.children}</Layout>
    </PageContextProvider>
  )

  const newElement = cloneElement(
    element, // I18nextProvider
    element.props,
    cloneElement(
      element.props.children, // I18nextContext.Provider
      element.props.children.props,
      wrapper
    )
  )

  return newElement

  // return (
  //   <PageContextProvider>
  //     {element}
  //   </PageContextProvider>
  // )
}
