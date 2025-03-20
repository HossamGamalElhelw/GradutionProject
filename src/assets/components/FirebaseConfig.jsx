// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDmbMqakdLN_3PIVmzopJ4zWZr--33sZ5I",
    authDomain: "test-6ea34.firebaseapp.com",
    projectId: "test-6ea34",
    storageBucket: "test-6ea34.appspot.com",
    messagingSenderId: "365790959184",
    appId: "1:365790959184:web:c6334636d19f5e6220e355",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const database = getDatabase(app);
export const firestoreDb = getFirestore(app);

export default auth;