import React, { useContext, useMemo } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import { usePageContext } from "../../hooks/use-page-context"

import Layout from "../layout/layout-default"
import PasswordResetForm from "../forms/password-reset"

import { UserContext } from "../context/user-context"

import {
  getDefaultTranslations,
  pathStripLanguage,
} from "../../utils/functions"

const Password = ({ pageContext }) => {
  const { t, languages, language } = useI18next()
  const { isAuthenticated } = useContext(UserContext)

  const nodeTranslations = useMemo(
    () => getDefaultTranslations(languages, pathStripLanguage()),
    [languages]
  )

  pageContext.breadcrumb = null
  pageContext.title = t("Reset your password")

  const localTasks = isAuthenticated()
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

  usePageContext(pageContext, nodeTranslations, localTasks)

  return (
    <Layout>
      <PasswordResetForm />
    </Layout>
  )
}

export default Password
