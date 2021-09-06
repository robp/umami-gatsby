import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Region from "../region"
import DisclaimerBlock from "../blocks/disclaimer"

import { styles } from "../../styles/regions/bottom.module.scss"

const BottomRegion = () => {
  const { t } = useTranslation()

  return (
    <Region className={styles}>
      <DisclaimerBlock />
      {t("Built with")} <a href="https://www.gatsbyjs.com">Gatsby</a>.{" "}
      <a href="https://github.com/robp/umami-gatsby">Source code</a>.
    </Region>
  )
}

export default BottomRegion
