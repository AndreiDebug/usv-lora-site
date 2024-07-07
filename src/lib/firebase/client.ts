import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// First Project Credentials
// const firebaseConfig = {
//   apiKey: "AIzaSyDhMVc--IB09uNsv886CBt8mgUBilGw3X4",
//   authDomain: "usv-licenta-a7175.firebaseapp.com",
//   projectId: "usv-licenta-a7175",
//   storageBucket: "usv-licenta-a7175.appspot.com",
//   messagingSenderId: "471236357038",
//   appId: "1:471236357038:web:184119297c5f9504ce763f",
// };

// Second project credentials
const firebaseConfig = {
  apiKey: "AIzaSyALBQ1C12x2t5totqjW2Qho1RQKpNgYdeU",
  authDomain: "usv-licenta-2.firebaseapp.com",
  projectId: "usv-licenta-2",
  storageBucket: "usv-licenta-2.appspot.com",
  messagingSenderId: "4384842293",
  appId: "1:4384842293:web:d06f27c56460577f63477c",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
