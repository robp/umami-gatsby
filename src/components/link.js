import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Link as I18nLink } from "gatsby-plugin-react-i18next"

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const Link = ({
  children,
  to,
  activeClassName,
  partiallyActive,
  getProps,
  language,
  ...rest
}) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to)

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return language ? (
      <I18nLink
        to={to}
        language={language}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        getProps={getProps}
        {...rest}
      >
        {children}
      </I18nLink>
    ) : (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        getProps={getProps}
        {...rest}
      >
        {children}
      </GatsbyLink>
    )
  }
  return (
    <a href={to} {...rest}>
      {children}
    </a>
  )
}

export default Link
