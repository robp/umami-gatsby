/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

export { wrapRootElement } from "./src/components/wrap-root-element"
export { wrapPageElement } from "./src/components/wrap-page-element"

/**
 * @todo Add htmlAttributes lang language
 * https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/#editing-html-and-body
 */
// export const onRenderBody = ({ setHtmlAttributes }) => {
//   setHtmlAttributes({ lang: language })
// }
