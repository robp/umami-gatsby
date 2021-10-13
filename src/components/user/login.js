import React, { useContext, useEffect, useMemo } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import { usePageContext } from "../../hooks/use-page-context"

import { PageContext } from "../context/page-context"
import { UserContext } from "../context/user-context"
import Layout from "../layout/layout-default"
import Seo from "../seo"
import LoginForm from "../forms/login"

import {
  getDefaultTranslations,
  pathStripLanguage,
} from "../../utils/functions"

const Login = ({ pageContext }) => {
  const { t, languages, language, navigate } = useI18next()
  const { setLocalTasks } = useContext(PageContext)
  const { isAuthenticated } = useContext(UserContext)

  const nodeTranslations = useMemo(
    () => getDefaultTranslations(languages, pathStripLanguage()),
    [languages]
  )

  pageContext.title = t("Log in")
  usePageContext(pageContext, nodeTranslations)

  useEffect(() => {
    setLocalTasks([
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
    ])
    return () => {
      setLocalTasks([])
    }
  }, [language, setLocalTasks, t])

  if (isAuthenticated()) {
    navigate("/user")
    return null
  }

  return (
    <Layout>
      <Seo title={pageContext.title} />
      <LoginForm />
    </Layout>
  )
}

export default Login
