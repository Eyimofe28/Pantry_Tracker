// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3X1XKWeMMxaQqBuxUlwDtCabzVMCKEYc",
  authDomain: "inventory-management-d0c53.firebaseapp.com",
  projectId: "inventory-management-d0c53",
  storageBucket: "inventory-management-d0c53.appspot.com",
  messagingSenderId: "459502995134",
  appId: "1:459502995134:web:ca0719e6c6ca201c69c0ef",
  measurementId: "G-1F0DJG20ZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app)

export {firestore}