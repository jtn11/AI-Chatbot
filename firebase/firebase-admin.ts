import admin from "firebase-admin";
import serviceAccount from "@/firebase/serviceAccountkey.json";

let app: admin.app.App | null = null;

export function getAdminApp() {
  if (app) {
    return app;
  }
  if (!process.env.FIREBASE_ADMIN_KEY) {
    throw new Error("MISSING FIREBASE ADMIN KEY");
  }

  // let serviceAccount ;

  //   try {
  //   serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);
  // } catch (err) {
  //   console.error("JSON PARSE FAILED");
  //   throw err;
  // }
  // app = admin.initializeApp({
  //   credential: admin.credential.cert({
  //     projectId: serviceAccount.project_id,
  //     clientEmail: serviceAccount.client_email,
  //     privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
  //   }),
  // });

  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });

  return app;
}

export function getAdminDb() {
  return getAdminApp().firestore();
}

export function getAdminAuth() {
  return getAdminApp().auth();
}
