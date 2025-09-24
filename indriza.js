// indriza.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDCEbdhzv1NBznnUx-s3W5xzV_Clm92mQs",
  authDomain: "indriza-electrical.firebaseapp.com",
  projectId: "indriza-electrical",
  storageBucket: "indriza-electrical.firebasestorage.app",
  messagingSenderId: "261641055248",
  appId: "1:261641055248:web:e78ce058b806a9173aee95",
  measurementId: "G-R7CMNL5GZP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export what other modules will need
// You can import { db, collection, addDoc } from "./indriza.js";
export { app, auth, db, collection, addDoc };
