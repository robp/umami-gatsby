import React, { cloneElement } from "react"
import PageContextProvider from "./context/page-context"

import LayoutDefault from "./layout/layout-default"

export const wrapPageElement = ({ element, props }) => {
  /**
   * Wrap our elements with the I18nextProvider so that we have i18n
   * context in our components
   * @see https://andremonteiro.pt/gatsby-i18next-wrap-page-element/
   */
  const theElement = element.props.children.props.children

  const { component: Layout = LayoutDefault, props: layoutProps = {} } =
    theElement.type.layout || {}

  const wrapper = (
    <PageContextProvider>
      <Layout {...layoutProps}>{theElement}</Layout>
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
