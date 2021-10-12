import React, { useContext, useEffect, useMemo } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"

import { PageContext } from "../context/page-context"
import Layout from "../layout/layout-default"
import Seo from "../seo"
import PasswordResetForm from "../forms/password-reset"

import { UserContext } from "../context/user-context"

import {
  getDefaultTranslations,
  pathStripLanguage,
} from "../../utils/functions"

const Password = ({ pageContext }) => {
  const { t, languages, language } = useI18next()
  const { setStoredPageContext, setTranslations, setLocalTasks } =
    useContext(PageContext)
  const { isAuthenticated } = useContext(UserContext)

  const nodeTranslations = useMemo(
    () => getDefaultTranslations(languages, pathStripLanguage()),
    [languages]
  )

  useEffect(() => {
    setTranslations(nodeTranslations)
  }, [nodeTranslations, setTranslations])

  pageContext.breadcrumb = null
  pageContext.title = t("Reset your password")

  useEffect(() => {
    setStoredPageContext(pageContext)
  }, [pageContext, setStoredPageContext])

  useEffect(() => {
    setLocalTasks(
      isAuthenticated()
        ? []
        : [
            {
              node: {
                id: "log-in",
                title: t("Log in"),
                url: `/${language}/user/login`,
                parent: null,
                langcode: language,
              },
            },
            {
              node: {
                id: "reset-password",
                title: t("Reset your password"),
                url: `/${language}/user/password`,
                parent: null,
                langcode: language,
              },
            },
          ]
    )
    return () => {
      setLocalTasks([])
    }
  }, [language, isAuthenticated, setLocalTasks, t])

  return (
    <Layout>
      <Seo title={pageContext.title} />
      <PasswordResetForm />
    </Layout>
  )
}

export default Password
