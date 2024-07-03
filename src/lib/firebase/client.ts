import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhMVc--IB09uNsv886CBt8mgUBilGw3X4",
  authDomain: "usv-licenta-a7175.firebaseapp.com",
  projectId: "usv-licenta-a7175",
  storageBucket: "usv-licenta-a7175.appspot.com",
  messagingSenderId: "471236357038",
  appId: "1:471236357038:web:184119297c5f9504ce763f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
