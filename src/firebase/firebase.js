import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBu_Tgj6a9fKJFX14NQJLYh2P0I4E7CzDM",
  authDomain: "census-87ed1.firebaseapp.com",
  databaseURL: "https://census-87ed1-default-rtdb.firebaseio.com",
  projectId: "census-87ed1",
  storageBucket: "census-87ed1.appspot.com",
  messagingSenderId: "843885314047",
  appId: "1:843885314047:web:900c119603fbacc45ab1ca"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };