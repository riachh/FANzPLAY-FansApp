import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, Timestamp } from "firebase/firestore";

import {
  PUBLIC_FIREBASE_API_KEY,
  PUBLIC_FIREBASE_AUTH_DOMAIN,
  PUBLIC_FIREBASE_DATABASE_URL,
  PUBLIC_FIREBASE_PROJECT_ID,
  PUBLIC_FIREBASE_STORAGE_BUCKET,
  PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  PUBLIC_FIREBASE_APP_ID,
  PUBLIC_FIREBASE_MEASUREMENT_ID
} from "@env";

// Initialize Firebase application (if needed) with credentials stored in .env file, then export it
//   credentials and API reference obtained from: Firebase -> fanzplay -> Project settings -> General

const clientCredentials = {
  apiKey: PUBLIC_FIREBASE_API_KEY,
  authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: PUBLIC_FIREBASE_DATABASE_URL,
  projectId: PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: PUBLIC_FIREBASE_APP_ID,
  measurementId: PUBLIC_FIREBASE_MEASUREMENT_ID
};

console.log("Hello");
console.log(clientCredentials);

function initFirebaseApp(config) {
  try {
    return getApp();

  } catch {
    let app = initializeApp(config);

    return app;
  }
}

export const firebase = initFirebaseApp(clientCredentials);

// Export Auth and Firestore Database handles
//   Auth reference: https://firebase.google.com/docs/auth/web/password-auth?hl=en#web-version-9
//   Firestore reference: https://firebase.google.com/docs/firestore/quickstart?hl=en#web-version-9

export const auth = getAuth(firebase);
export const db = getFirestore(firebase);

// Export timestamp type
//   reference: https://firebase.google.com/docs/reference/js/firestore_.timestamp

export const timestamp = Timestamp;