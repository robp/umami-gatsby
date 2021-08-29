import React from "react"
import PropTypes from "prop-types"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Term from "./term"
import Field from "./field"

import "../styles/tags.module.scss"
function Tags({ lang, data }) {
  const { t } = useTranslation()

  const terms = []

  if (data?.length) {
    data.forEach(term => {
      terms.push(<Term lang={lang} key={term.id} {...term} />)
    })
  }

  return <Field labelItems labelInline label={t("Tags")} items={terms} />
}

Tags.propTypes = {
  lang: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}

export default Tags
