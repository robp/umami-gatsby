import { useSiteMetadata } from "../hooks/use-site-metadata"
import { navigate } from "gatsby"

const IndexPage = () => {
  const { languages } = useSiteMetadata()

  /**
   * @todo Do this without the hack of testing navigator.
   */
  const userLang =
    typeof navigator !== "undefined"
      ? (navigator.language || navigator.userLanguage).substring(0, 2)
      : ""
  const langcode = languages.langs.includes(userLang)
    ? userLang
    : languages.defaultLangKey
  const href = `/${langcode}`
  /**
   * @todo Do this without the hack of testing window.
   */
  if (typeof window !== "undefined") {
    navigate(href, { replace: true })
  }
  return null
}

export default IndexPage
