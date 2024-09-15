import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm27c4fs-lYwXLnMHfWEigFC3j1jeZTNA",
  authDomain: "cantemosmobile.firebaseapp.com",
  projectId: "cantemosmobile",
  storageBucket: "cantemosmobile.appspot.com",
  messagingSenderId: "238038630039",
  appId: "1:238038630039:web:dd48b77c3762c67b5973d2",
  measurementId: "G-BMXLTXBJ25"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );