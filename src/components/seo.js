/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useI18next } from "gatsby-plugin-react-i18next"
import { useSiteMetadata } from "../hooks/use-site-metadata"

function Seo({ title, description, pathname, children }) {
  const { t } = useI18next()
  const {
    title: defaultTitle,
    description: defaultDescription,
    author,
    siteUrl,
  } = useSiteMetadata()

  const seo = {
    title: title || t("Untitled"),
    description: description || defaultDescription,
    author: author || ``,
    url: `${siteUrl}${pathname || ``}`,
  }

  return (
    <>
      <title>
        {seo.title}
        {defaultTitle && ` | ${defaultTitle}`}
      </title>
      <meta name="description" content={seo.description} />
      <meta name="og:title" content={seo.title} />
      <meta name="og:description" content={seo.description} />
      <meta name="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:creator" content={seo.author} />
      {children}
    </>
  )
}

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  pathname: PropTypes.string,
  children: PropTypes.node,
}

export default Seo
