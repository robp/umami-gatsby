import React, { useContext, useEffect } from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import { PageContext } from "../components/context/page-context"
import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"

import { container } from "../styles/layout.module.scss"

const NotFoundPage = ({ pageContext }) => {
  const { t } = useTranslation()
  const { setStoredPageContext } = useContext(PageContext)

  pageContext.title = `404: ${t("Not found")}`

  useEffect(() => {
    setStoredPageContext(pageContext)
  }, [pageContext, setStoredPageContext])

  return (
    <Layout>
      <Seo title={pageContext.title} />
      <div className={container}>
        <p
          dangerouslySetInnerHTML={{
            __html: t(
              "You just hit a route that doesn&#39;t exist... the sadness."
            ),
          }}
        />
      </div>
    </Layout>
  )
}

export default NotFoundPage

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
