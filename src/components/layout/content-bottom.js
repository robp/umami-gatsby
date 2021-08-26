import * as React from "react"

import RecipeCollectionsBlock from "../blocks/recipe-collections"

import { container } from "../../styles/layout.module.scss"
import { styles } from "../../styles/content-bottom.module.scss"

const ContentBottom = () => {
  return (
    <div className={styles}>
      <div className={container}>
        <RecipeCollectionsBlock />
      </div>
    </div>
  )
}

export default ContentBottom
