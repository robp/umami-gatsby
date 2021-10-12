import React, { useContext, useEffect, useMemo } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"

import { PageContext } from "../context/page-context"
import { UserContext } from "../context/user-context"
import Layout from "../layout/layout-default"
import Seo from "../seo"
import UserEditForm from "../forms/user-edit"

import {
  getDefaultTranslations,
  pathStripLanguage,
} from "../../utils/functions"

const Edit = ({ pageContext }) => {
  const { t, languages, language } = useI18next()
  const { setStoredPageContext, setTranslations, setLocalTasks } =
    useContext(PageContext)
  const { getCurrentUser } = useContext(UserContext)
  const nodeTranslations = useMemo(
    () => getDefaultTranslations(languages, pathStripLanguage()),
    [languages]
  )

  useEffect(() => {
    setTranslations(nodeTranslations)
  }, [nodeTranslations, setTranslations])

  useEffect(() => {
    setStoredPageContext(pageContext)
  }, [pageContext, setStoredPageContext])

  pageContext.breadcrumb = null

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

  return (
    <Layout>
      <Seo title={pageContext.title} />
      <UserEditForm />
    </Layout>
  )
}

export default Edit
