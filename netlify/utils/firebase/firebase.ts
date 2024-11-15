import firebaseAdmin from "firebase-admin";

const {
  FIREBASE_ADMIN_CLIENT_EMAIL,
  FIREBASE_ADMIN_PRIVATE_KEY,
  FIREBASE_ADMIN_PROJECT_ID,
} = process.env;

const firebaseAdminCredential = {
  credential: firebaseAdmin.credential.cert({
    clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: FIREBASE_ADMIN_PRIVATE_KEY
      ? FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n")
      : undefined,
    projectId: FIREBASE_ADMIN_PROJECT_ID,
  }),
};

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp(firebaseAdminCredential);
}

export const firestoreAdmin = firebaseAdmin.firestore();

export const authAdmin = firebaseAdmin.auth();
