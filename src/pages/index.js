import { useSiteMetadata } from "../hooks/use-site-metadata"

const IndexPage = () => {
  const { languages } = useSiteMetadata()
  const userLang = (navigator.language || navigator.userLanguage).substring(
    0,
    2
  )
  const langcode = languages.langs.includes(userLang) ? userLang : languages.defaultLangKey
  window.location.href = `/${langcode}`
  return null
}

export default IndexPage
