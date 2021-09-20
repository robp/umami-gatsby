import React, { useContext, useEffect, useMemo } from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import { Redirect } from "@reach/router"

import { PageContext } from "../../components/context/page-context"
import { LanguageSwitcherContext } from "../../components/context/language-switcher-context"
import { UserContext } from "../../components/context/user-context"
import Layout from "../../components/layout/layout-default"
import Seo from "../../components/seo"

import { getDefaultTranslations } from "../../utils/functions"

const Page = ({ pageContext, data }) => {
  const { t, languages, language, originalPath } = useI18next()
  const { setStoredPageContext } = useContext(PageContext)
  const { setTranslations } = useContext(LanguageSwitcherContext)
  const { user, isAuthenticated } = useContext(UserContext)

  const nodeTranslations = useMemo(
    () => getDefaultTranslations(languages, originalPath),
    [languages, originalPath]
  )

  useEffect(() => {
    setTranslations(nodeTranslations)
  }, [nodeTranslations, setTranslations])

  useEffect(() => {
    setStoredPageContext(pageContext)
  }, [pageContext, setStoredPageContext])

  if (user) {
    pageContext.title = user.email
  }

  // const regDate = new Date(user.createdAt)

  return isAuthenticated() ? (
    <Layout>
      <Seo title={pageContext.title} />
      <p>{t("Member for {{howLong}}", "3 weeks")}</p>
    </Layout>
  ) : (
    <Redirect to={`/${language}/user/login`} />
  )
}

export default Page

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
