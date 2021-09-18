import React, { createContext, useState, useMemo } from "react"
import PropTypes from "prop-types"
import { initializeApp } from "firebase/app"

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { isBrowser } from "../../utils/functions"

export const UserContext = createContext()

const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
}

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const app = useMemo(() => initializeApp(firebaseConfig), [])
  console.log("app", app)

  const isAuthenticated = () => {
    if (!isBrowser) {
      return
    }

    return user ? true : false
  }

  let login = async (username, password) => {
    if (!isBrowser) {
      return
    }

    const auth = getAuth()

    let response = await signInWithEmailAndPassword(auth, username, password)
      .then(userCredential => {
        // Signed in
        console.log("Signed In", userCredential)
        const user = userCredential.user
        setUser(user)
        return user
      })
      .catch(error => {
        // Failure
        const errorCode = error.code
        const errorMessage = error.message
        console.log("Login error:", errorCode, errorMessage)
        throw new Error(error)
      })

    return await response
  }

  const logout = () => {
    localStorage.setItem("isLoggedIn", false)

    // const { protocol, host } = window.location;
    // const returnTo = `${protocol}//${host}`;

    const auth = getAuth()
    signOut(auth)
      .then(() => {
        // navigate("/")
        console.log("Signed Out")
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log("Logout error:", errorCode, errorMessage)
      })
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: () => isAuthenticated(),
      authLogin: (username, password) => login(username, password),
      authLogout: () => logout(),
    }),
    [user]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserContextProvider
