import { useContext, useState } from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import { UserContext } from "../../components/context/user-context"
import { MessagesContext } from "../../components/context/messages-context"
import {
  MESSAGE_SEVERITY_SUCCESS,
  MESSAGE_SEVERITY_ERROR,
} from "../../components/message"

const Page = () => {
  const { t, navigate } = useI18next()
  const { addMessage } = useContext(MessagesContext)
  const { isAuthLoading, isAuthenticated, authLogout } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)

  if (!isLoading && isAuthenticated()) {
    setIsLoading(true)
    authLogout()
      .then(() => {
        addMessage({
          severity: MESSAGE_SEVERITY_SUCCESS,
          content: t("Logged out."),
        })
        setIsLoading(false)
        navigate("/")
      })
      .catch(error => {
        addMessage({
          severity: MESSAGE_SEVERITY_ERROR,
          content: error.message,
        })
        setIsLoading(false)
        navigate("/")
      })
  }

  if (!isAuthLoading && !isLoading && !isAuthenticated()) {
    navigate("/")
  }

  return null
}

export default Page

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
