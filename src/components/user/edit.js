import React, { useContext, useMemo } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import { usePageContext } from "../../hooks/use-page-context"

import { UserContext } from "../context/user-context"
import Layout from "../layout/layout-default"
import UserEditForm from "../forms/user-edit"

import {
  getDefaultTranslations,
  pathStripLanguage,
} from "../../utils/functions"

const Edit = ({ pageContext }) => {
  const { t, languages, language } = useI18next()
  const { getCurrentUser } = useContext(UserContext)
  const nodeTranslations = useMemo(
    () => getDefaultTranslations(languages, pathStripLanguage()),
    [languages]
  )

  pageContext.breadcrumb = null

  const user = getCurrentUser()

  if (user) {
    pageContext.title = user.email
  }

  const localTasks = [
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
  ]

  usePageContext(pageContext, nodeTranslations, localTasks)

  return (
    <Layout>
      <UserEditForm />
    </Layout>
  )
}

export default Edit
