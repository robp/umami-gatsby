import React, { useContext, useEffect, useMemo } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import moment from "moment"
import "moment/min/locales"

import { PageContext } from "../context/page-context"
import { UserContext } from "../context/user-context"
import Layout from "../layout/layout-default"
import Seo from "../seo"

import {
  getDefaultTranslations,
  pathStripLanguage,
} from "../../utils/functions"

import * as formStyles from "../../styles/form.module.scss"

const Index = ({ pageContext }) => {
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

  // const regDate = new Date(user.createdAt)

  const howLong = user?.metadata
    ? moment(user.metadata.createdAt, "x").locale(language).fromNow(true)
    : null

  return (
    <Layout>
      <Seo title={pageContext.title} />
      {user.photoURL ? (
        <div className={formStyles.formItem}>
          <img
            src={user.photoURL}
            width="100"
            height="100"
            alt={t("Profile picture for user {{username}}", {
              username: user.email,
            })}
            loading="lazy"
            typeof="foaf:Image"
            className="image-style-thumbnail"
          />
        </div>
      ) : null}
      <div className={formStyles.formItem}>
        <h4 className={formStyles.label}>{t("Member for")}</h4> {howLong}
      </div>
    </Layout>
  )
}

export default Index
