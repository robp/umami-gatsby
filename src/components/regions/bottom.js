import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Region from "../region"
import DisclaimerBlock from "../blocks/disclaimer"

import { styles } from "../../styles/regions/bottom.module.scss"

const BottomRegion = () => {
  const { t } = useTranslation()

  return (
    <Region className={styles}>
      <DisclaimerBlock />© {new Date().getFullYear()}, {t("Built with")}{" "}
      <a href="https://www.gatsbyjs.com">Gatsby</a>
    </Region>
  )
}

export default BottomRegion
