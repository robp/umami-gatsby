import React, { useContext } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"

import { UserContext } from "./context/user-context"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { isAuthenticated } = useContext(UserContext)
  const { navigate } = useI18next()

  if (!isAuthenticated()) {
    navigate("/user/login")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute
