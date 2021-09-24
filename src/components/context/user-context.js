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
    let response = await signInWithEmailAndPassword(auth, username, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        return user
      })
      .catch(error => {
        throw new Error(error.message, { cause: error.code })
      })

    return response
  }

  const authLogout = async () => {
    let response = await signOut(auth)
      .then(() => {
        // Signed out
        return true
      })
      .catch(error => {
        throw new Error(error.message, { cause: error.code })
      })

    return response
  }

  const authUpdateEmail = async (emailAddress, password) => {
    const user = getCurrentUser()
    // Create an auth credential with the supplied password.
    const credential = EmailAuthProvider.credential(user.email, password)
    // Reauthenticate with the credential.
    let response = await reauthenticateWithCredential(user, credential)
      .then(() => {
        updateEmail(user, emailAddress)
          .then(() => {
            return true
          })
          .catch(error => {
            throw new Error(error.message, { cause: error.code })
          })
      })
      .catch(error => {
        throw new Error(error.message, { cause: error.code })
      })

    return response
  }

  const authUpdatePassword = async (newPassword, oldPassword) => {
    const user = getCurrentUser()
    // Create an auth credential with the supplied password.
    const credential = EmailAuthProvider.credential(user.email, oldPassword)
    // Reauthenticate with the credential.
    let response = await reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, newPassword)
          .then(() => {
            return true
          })
          .catch(error => {
            throw new Error(error.message, { cause: error.code })
          })
      })
      .catch(error => {
        throw new Error(error.message, { cause: error.code })
      })

    return response
  }

  const authResetPassword = async emailAddress => {
    let response = await sendPasswordResetEmail(auth, emailAddress)
      .then(() => {
        return true
      })
      .catch(error => {
        throw new Error(error.message, { cause: error.code })
      })

    return response
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
