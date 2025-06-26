import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"

import {  connectAuthEmulator } from "firebase/auth";
import {  connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const db = getFirestore(app)
export const auth = getAuth(app)
export const functions = getFunctions(app);
export const storage = getStorage(app);


// Initialize Analytics (only in browser)
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null




// Your web app's Firebase configuration (replace with your actual config from config.js)
// const firebaseConfig = {
//   apiKey: "AIzaSyDuxVd6AWbNRHK3Fe_96W3B9vHDCkxBmYY",
//   authDomain: "newsfeeds-b4568.firebaseapp.com",
//   projectId: "newsfeeds-b4568",
//   storageBucket: "newsfeeds-b4568.firebasestorage.app",
//   messagingSenderId: "774394099139",
//   appId: "1:774394099139:web:efa708359db9cfa7e33976",
//   measurementId: "G-EF8F2G9LV1"
// };



// Connect to Firebase Emulators if in development environment
if (process.env.NODE_ENV === 'development') {
  console.log("Connecting to Firebase Emulators...");
  try {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(db, "localhost", 8080);
    connectFunctionsEmulator(functions, "localhost", 5001);
    connectStorageEmulator(storage, "localhost", 9199);
  } catch (e) {
    console.warn("Could not connect to Firebase Emulators. Make sure they are running.", e);
  }
}

export default app