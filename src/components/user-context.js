import React from "react"
import PropTypes from "prop-types"
import { createContext } from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

export const UserStateContext = createContext(null)

const UserContext = ({ children }) => {
  const { languages } = useSiteMetadata()

  const getLocale = () => {
    const pathname = window.location.pathname
    const locale = pathname.split("/")[1]
    return languages.langs.includes(locale) ? locale : languages.defaultLangKey
  }

  const user = {
    locale: getLocale(),
  }

  return (
    <UserStateContext.Provider value={user}>
      {children}
    </UserStateContext.Provider>
  )
}

UserContext.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserContext
