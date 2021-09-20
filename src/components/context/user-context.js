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

  let login = async (username, password) => {
    if (!isBrowser) {
      return
    }

    const auth = getAuth()

    let response = await signInWithEmailAndPassword(auth, username, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        setUser(user)
        localStorage.setItem("isLoggedIn", true)
        return user
      })
      .catch(error => {
        throw new Error(error.message, { cause: error.code })
      })

    return await response
  }

  const logout = async () => {
    if (!isBrowser) {
      return
    }

    const auth = getAuth()
    let response = await signOut(auth)
      .then(() => {
        // Signed out
        setUser(null)
        localStorage.setItem("isLoggedIn", false)
        return true
      })
      .catch(error => {
        throw new Error(error.message, { cause: error.code })
      })

    return await response
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: () => {
        return user ? true : false
      },
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
