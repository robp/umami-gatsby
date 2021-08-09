import { useSiteMetadata } from "../hooks/use-site-metadata"
import { navigate } from "gatsby"

const IndexPage = () => {
  const { languages } = useSiteMetadata()
  const userLang = (navigator.language || navigator.userLanguage).substring(
    0,
    2
  )
  const langcode = languages.langs.includes(userLang) ? userLang : languages.defaultLangKey
  const href = `/${langcode}`
  navigate(href, { replace: true })
  return null
}

export default IndexPage
