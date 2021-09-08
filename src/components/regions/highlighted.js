import * as React from "react"

import Region from "../region"

import MessagesBlock from "../blocks/messages"

import { styles } from "../../styles/regions/highlighted.module.scss"

const HighlightedRegion = () => (
  <Region className={styles}>
    <MessagesBlock />
  </Region>
)

export default HighlightedRegion
