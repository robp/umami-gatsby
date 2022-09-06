import React, { useContext, useMemo } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import { usePageContext } from "../../hooks/use-page-context"

import { UserContext } from "../context/user-context"
import LoginForm from "../forms/login"

import {
  getDefaultTranslations,
  pathStripLanguage,
} from "../../utils/functions"

const Login = ({ pageContext }) => {
  const { t, languages, language, navigate } = useI18next()
  const { isAuthenticated } = useContext(UserContext)

  const nodeTranslations = useMemo(
    () => getDefaultTranslations(languages, pathStripLanguage()),
    [languages]
  )

  pageContext.title = t("Log in")

  const localTasks = [
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

  if (isAuthenticated()) {
    navigate("/user")
    return null
  }

  return <LoginForm />
}

export default Login
