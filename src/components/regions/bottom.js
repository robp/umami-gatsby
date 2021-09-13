import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Region from "../region"
import DisclaimerBlock from "../blocks/disclaimer"
import GatsbyBlock from "../blocks/gatsby"

import { styles } from "../../styles/regions/bottom.module.scss"

const BottomRegion = () => {
  const { t } = useTranslation()

  return (
    <Region className={styles}>
      <DisclaimerBlock />
      <GatsbyBlock />
    </Region>
  )
}

export default BottomRegion
