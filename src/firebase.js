import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDr0hb7GH5GbTx7-z9hOlN7_uBTKpbT3uc",
  authDomain: "exclusive-55895.firebaseapp.com",
  projectId: "exclusive-55895",
  storageBucket: "exclusive-55895.firebasestorage.app",
  messagingSenderId: "160533500035",
  appId: "1:160533500035:web:1f63e9d422d3f747e0cbb6",
  measurementId: "G-Z4RDFZ6CHF"
};

 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);

 export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()