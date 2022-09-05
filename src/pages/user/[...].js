import React, { useContext } from "react"
import { Router } from "@reach/router"
import { graphql } from "gatsby"

import { UserContext } from "../../components/context/user-context"

import Seo from "../../components/seo"
import Index from "../../components/user/index"
import Edit from "../../components/user/edit"
import Login from "../../components/user/login"
import Logout from "../../components/user/logout"
import Password from "../../components/user/password"
import PrivateRoute from "../../components/private-route"

const User = ({ pageContext }) => {
  const { isAuthLoading } = useContext(UserContext)

  if (isAuthLoading) {
    return null
  }

  return (
    <Router basepath="/:lang/user">
      <PrivateRoute path="/" component={Index} pageContext={pageContext} />
      <PrivateRoute path="/edit" component={Edit} pageContext={pageContext} />
      <PrivateRoute
        path="/logout"
        component={Logout}
        pageContext={pageContext}
      />
      <Password path="/password" pageContext={pageContext} />
      <Login path="/login" pageContext={pageContext} />
    </Router>
  )
}

export default User

export const Head = ({ location, pageContext }) => (
  <Seo title={pageContext.title} pathname={location.pathname} />
)

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
