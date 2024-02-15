import { initializeApp  } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyDRuh6hKU2rOYVtqPNoEhEjgQpulpekYpk",
    authDomain: "visionary-62889.firebaseapp.com",
    projectId: "visionary-62889",
    storageBucket: "visionary-62889.appspot.com",
    messagingSenderId: "987555345952",
    appId: "1:987555345952:web:822227c48fbc1b995b6e45"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const fs = getFirestore(app);
const store = getStorage();


export { app, auth ,fs, store };
