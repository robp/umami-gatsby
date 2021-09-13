import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Block from "../block"

const GatsbyBlock = () => {
  const { t } = useTranslation()

  return (
    <Block locations={[/.*/]}>
      {t("Built with")} <a href="https://www.gatsbyjs.com">Gatsby</a>.{" "}
      <a href="https://github.com/robp/umami-gatsby">{t("Source code")}</a>.
    </Block>
  )
}

export default GatsbyBlock
