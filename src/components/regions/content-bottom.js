import * as React from "react"

import Region from "../region"
import RecipeCollectionsBlock from "../blocks/recipe-collections"

import { styles } from "../../styles/regions/content-bottom.module.scss"

const ContentBottomRegion = () => {
  return (
    <Region className={styles}>
      <RecipeCollectionsBlock />
    </Region>
  )
}

export default ContentBottomRegion
