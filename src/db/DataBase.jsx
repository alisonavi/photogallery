// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// import { getStorage } from "firebase/storage"
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2JaNUCw4UDfENpI9f4GQJ8cPkuOjWKzE",
  authDomain: "photogallery-c46bc.firebaseapp.com",
  projectId: "photogallery-c46bc",
  storageBucket: "photogallery-c46bc.appspot.com",
  messagingSenderId: "649253264903",
  appId: "1:649253264903:web:c3c031db65caa4328494a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const storage = getStorage()
const db = getFirestore(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db }