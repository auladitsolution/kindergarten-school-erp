import { getApps, getApp, initializeApp, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

function getFirebaseAdmin(): App {
  if (getApps().length > 0) {
    return getApp();
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (privateKey) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  if (projectId && clientEmail && privateKey) {
    try {
      return initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    } catch (error) {
      console.warn("Failed to initialize Firebase Admin SDK with credentials:", error);
    }
  }

  // Fallback app for dev/mock mode
  return initializeApp({ projectId: "kindergarten-school-demo" });
}

export const adminApp = getFirebaseAdmin();
export const adminAuth = getAuth(adminApp);
