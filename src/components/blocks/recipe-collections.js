import React from 'react'
import { useTranslation } from "gatsby-plugin-react-i18next"

import Block from '../block'

const RecipeCollections = () => {
  const { t } = useTranslation()

  return (
    <Block title={t("Recipe collections")}>
      <p>Hello, world</p>
    </Block>
  )
}

export default RecipeCollections
