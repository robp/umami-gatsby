import { useContext, useState } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"

import { UserContext } from "../context/user-context"
import { MessagesContext } from "../context/messages-context"
import { MESSAGE_SEVERITY_SUCCESS, MESSAGE_SEVERITY_ERROR } from "../message"

const Logout = () => {
  const { t, navigate } = useI18next()
  const { addMessage } = useContext(MessagesContext)
  const { authLogout } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)

  const doLogout = async () => {
    try {
      await authLogout()
      addMessage({
        severity: MESSAGE_SEVERITY_SUCCESS,
        content: t("Logged out."),
      })
      navigate("/")
    } catch (error) {
      addMessage({
        severity: MESSAGE_SEVERITY_ERROR,
        content: error.message,
      })
      navigate("/")
    }
  }

  if (!isLoading) {
    setIsLoading(true)
    doLogout()
  }

  return null
}

export default Logout
