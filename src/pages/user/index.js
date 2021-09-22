import React, { useContext, useEffect, useMemo } from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import { PageContext } from "../../components/context/page-context"
import { UserContext } from "../../components/context/user-context"
import Layout from "../../components/layout/layout-default"
import Seo from "../../components/seo"

import { getDefaultTranslations } from "../../utils/functions"

const Page = ({ pageContext, data }) => {
  const { t, languages, language, originalPath, navigate } = useI18next()
  const { setStoredPageContext, setTranslations, setLocalTasks } =
    useContext(PageContext)
  const { isAuthLoading, getCurrentUser, isAuthenticated } =
    useContext(UserContext)

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

  const user = getCurrentUser()

  if (user) {
    pageContext.title = user.email
  }

  useEffect(() => {
    setLocalTasks([
      {
        node: {
          id: "view",
          title: t("View"),
          url: `/${language}/user`,
          parent: null,
          langcode: language,
        },
      },
      {
        node: {
          id: "edit",
          title: t("Edit"),
          url: `/${language}/user/edit`,
          parent: null,
          langcode: language,
        },
      },
    ])
    return () => {
      setLocalTasks([])
    }
  }, [language, setLocalTasks, t])

  // const regDate = new Date(user.createdAt)
  if (isAuthLoading) {
    return null
  }

  if (!isAuthenticated()) {
    navigate("/user/login")
  }

  return (
    <Layout>
      <Seo title={pageContext.title} />
      <p>{t("Member for {{howLong}}", { howLong: "3 weeks" })}</p>
    </Layout>
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
