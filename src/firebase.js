// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'azhar-estate.firebaseapp.com',
  projectId: 'azhar-estate',
  storageBucket: 'azhar-estate.appspot.com',
  messagingSenderId: '797135662299',
  appId: '1:797135662299:web:79157103050256c30730fe',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
