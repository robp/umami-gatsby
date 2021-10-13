import { useContext, useEffect, useMemo } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import { PageContext } from "../components/context/page-context"
import { getDefaultTranslations } from "../utils/functions"

export const usePageContext = (
  pageContext,
  translations = null,
  localTasks = []
) => {
  const { languages, originalPath } = useI18next()
  const { setStoredPageContext, setTranslations, setLocalTasks } =
    useContext(PageContext)

  const nodeTranslations = useMemo(
    () => translations || getDefaultTranslations(languages, originalPath),
    [languages, originalPath, translations]
  )

  setTranslations(nodeTranslations)
  setStoredPageContext(pageContext)

  useEffect(() => {
    setLocalTasks(localTasks)
    return () => {
      setLocalTasks([])
    }
  }, [setLocalTasks])

  return {
    nodeTranslations: nodeTranslations,
  }
}
