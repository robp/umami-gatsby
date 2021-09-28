import React, { createContext, useState, useMemo } from "react"
import PropTypes from "prop-types"
import { initializeApp } from "firebase/app"

import {
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  signOut,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth"

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
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  const auth = useMemo(() => {
    if (!isBrowser()) {
      return null
    }

    initializeApp(firebaseConfig)
    const auth = getAuth()

    onAuthStateChanged(auth, user => {
      setIsAuthLoading(false)
      if (user) {
        // setUser(user)
      } else {
        // setUser(null)
      }
    })

    return auth
  }, [])

  let authLogin = async (username, password) => {
    try {
      let response = await signInWithEmailAndPassword(auth, username, password)
      return response.user
    } catch (error) {
      throw new Error(error.message, { cause: error.code })
    }
  }

  const authLogout = async () => {
    try {
      await signOut(auth)
      return true
    } catch (error) {
      throw new Error(error.message, { cause: error.code })
    }
  }

  const authUpdateEmail = async (emailAddress, password) => {
    const user = getCurrentUser()
    const credential = EmailAuthProvider.credential(user.email, password)
    try {
      await reauthenticateWithCredential(user, credential)
      await updateEmail(user, emailAddress)
      return true
    } catch (error) {
      throw new Error(error.message, { cause: error.code })
    }
  }

  const authUpdatePassword = async (newPassword, oldPassword) => {
    const user = getCurrentUser()
    const credential = EmailAuthProvider.credential(user.email, oldPassword)
    try {
      await reauthenticateWithCredential(user, credential)
      await updatePassword(user, newPassword)
      return true
    } catch (error) {
      throw new Error(error.message, { cause: error.code })
    }
  }

  const authResetPassword = async emailAddress => {
    try {
      await sendPasswordResetEmail(auth, emailAddress)
      return true
    } catch (error) {
      throw new Error(error.message, { cause: error.code })
    }
  }

  const isAuthenticated = () => {
    return auth?.currentUser ? true : false
  }

  const getCurrentUser = () => {
    return auth?.currentUser
  }

  const value = {
    isAuthLoading,
    getCurrentUser,
    isAuthenticated,
    authLogin,
    authLogout,
    authUpdateEmail,
    authUpdatePassword,
    authResetPassword,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserContextProvider
