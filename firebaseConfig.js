import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import {} from

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwV0aMq98NJU3obdhUEHPBkUORIByL10w",
  authDomain: "keyp-auth-d5db5.firebaseapp.com",
  projectId: "keyp-auth-d5db5",
  storageBucket: "keyp-auth-d5db5.appspot.com",
  messagingSenderId: "630961185421",
  appId: "1:630961185421:web:000e9a55480992063778c4",
  measurementId: "G-XHQFWL3CED",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
export { db, storage, auth };
