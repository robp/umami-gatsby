// import { initializeApp } from "firebase/app"
// import { isBrowser } from "./functions"

// To speed things up, we’ll keep the profile stored unless the user logs out.
// This prevents a flicker while the HTTP round-trip completes.
// let profile = false

// Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.GATSBY_FIREBASE_API_KEY,
//   authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.GATSBY_FIREBASE_APP_ID,
// }
// console.log(process.env)

// Only initialize Firebase if we’re in the browser.
// export const getApp = config => {
//   const app = isBrowser ? initializeApp(config) : {}
//   console.log(app)
//   return app
// }
