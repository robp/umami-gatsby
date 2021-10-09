import React, { createContext, useState, useMemo } from "react"
import PropTypes from "prop-types"
import { initializeApp } from "firebase/app"

import {
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth"

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

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

  const storage = useMemo(() => {
    if (!isBrowser()) {
      return null
    }

    const storage = getStorage()
    return storage
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

  const authUpdateProfile = async ({ displayName, photoURL }) => {
    const user = getCurrentUser()
    // const credential = EmailAuthProvider.credential(user.email, oldPassword)
    try {
      // await reauthenticateWithCredential(user, credential)
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      })
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

  const getStorageRef = path => {
    return ref(storage, path)
  }

  const putFile = async (path, data) => {
    const storageRef = getStorageRef(path)
    try {
      const snapshot = await uploadBytes(storageRef, data)
      const uploadURL = await getDownloadURL(snapshot.ref)
      return uploadURL
    } catch (error) {
      throw new Error(error.message, { cause: error.code })
    }
  }

  const value = {
    authLogin,
    authLogout,
    authResetPassword,
    authUpdateEmail,
    authUpdatePassword,
    authUpdateProfile,
    getCurrentUser,
    isAuthLoading,
    isAuthenticated,
    putFile,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserContextProvider
