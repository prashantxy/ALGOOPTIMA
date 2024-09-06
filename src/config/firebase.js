import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDp5S75BGoAzu9YcmH2-Kzw_6tfmup5GJU",
  authDomain: "bus-management-app-378bf.firebaseapp.com",
  projectId: "bus-management-app-378bf",
  storageBucket: "bus-management-app-378bf.appspot.com",
  messagingSenderId: "382883093920",
  appId: "1:382883093920:web:f0994941b28f3a7a3498c5",
  measurementId: "G-FMCWPWJ0MQ"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db=getFirestore(app);