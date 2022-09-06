import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { usePageContext } from "../hooks/use-page-context"

import { container } from "../styles/layout.module.scss"

const NotFoundPage = ({ pageContext }) => {
  const { t } = useTranslation()

  pageContext.title = `404: ${t("Not found")}`
  usePageContext(pageContext)

  return (
    <div className={container}>
      <p
        dangerouslySetInnerHTML={{
          __html: t(
            "You just hit a route that doesn&#39;t exist... the sadness."
          ),
        }}
      />
    </div>
  )
}

export default NotFoundPage

export { Head } from "./index"

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
