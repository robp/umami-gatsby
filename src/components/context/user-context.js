import React, { createContext, useState, useMemo } from "react"
import PropTypes from "prop-types"
import { initializeApp } from "firebase/app"

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"

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
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  const auth = useMemo(() => {
    initializeApp(firebaseConfig)
    return getAuth()
  }, [])

  onAuthStateChanged(auth, user => {
    setIsAuthLoading(false)
    console.log('onAuthStateChanged', user)
    if (user) {
      console.log('signed in')
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // setUser(user)
      // localStorage.setItem("isLoggedIn", true)
      // ...
    } else {
      console.log('signed out')
      // setUser(null)
      // localStorage.setItem("isLoggedIn", false)
    }
  })

  let authLogin = async (username, password) => {
    let response = await signInWithEmailAndPassword(auth, username, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        // setUser(user)
        return user
      })
      .catch(error => {
        throw new Error(error.message, { cause: error.code })
      })

    return await response
  }

  const authLogout = async () => {
    let response = await signOut(auth)
      .then(() => {
        // Signed out
        // setUser(null)
        return true
      })
      .catch(error => {
        throw new Error(error.message, { cause: error.code })
      })

    return await response
  }

  const isAuthenticated = () => {
    const user = auth.currentUser
    return user ? true : false
  }

  const getCurrentUser = () => {
    return auth.currentUser
  }

  const value = {
    isAuthLoading,
    getCurrentUser,
    isAuthenticated,
    authLogin,
    authLogout,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserContextProvider
