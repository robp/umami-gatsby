import { useContext, useMemo } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import { PageContext } from "../components/context/page-context"
import { getDefaultTranslations } from "../utils/functions"

export const usePageContext = (pageContext, translations = null) => {
  const { languages, originalPath } = useI18next()
  const { setStoredPageContext, setTranslations } = useContext(PageContext)

  const nodeTranslations = useMemo(
    () => translations || getDefaultTranslations(languages, originalPath),
    [languages, originalPath, translations]
  )

  setTranslations(nodeTranslations)
  setStoredPageContext(pageContext)

  return {
    nodeTranslations: nodeTranslations,
  }
}
