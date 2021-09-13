import * as React from "react"

import Region from "../region"
import DisclaimerBlock from "../blocks/disclaimer"
import GatsbyBlock from "../blocks/gatsby"

import { styles } from "../../styles/regions/bottom.module.scss"

const BottomRegion = () => {
  return (
    <Region className={styles}>
      <DisclaimerBlock />
      <GatsbyBlock />
    </Region>
  )
}

export default BottomRegion
