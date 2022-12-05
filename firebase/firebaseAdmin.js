import * as firebaseAdmin from 'firebase-admin';

import {
  PRIVATE_FIREBASE_KEY_FILE,
  PUBLIC_FIREBASE_DATABASE_URL
} from "@env";

// reference obtained from: Firebase -> fanzplay -> Project settings -> Service accounts
let serviceAccount = require(PRIVATE_FIREBASE_KEY_FILE);

if (firebaseAdmin.apps.length == 0) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: PUBLIC_FIREBASE_DATABASE_URL
  });
}

export default { firebaseAdmin };