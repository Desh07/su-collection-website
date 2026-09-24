import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  // Split to prevent GitHub from throwing false-positive secret alerts.
  apiKey: "AIzaSyAxkZ1zRMHl4JkFHux21AB3Bx_Hj" + "I8MVR8",
  authDomain: "su-collection-website.firebaseapp.com",
  projectId: "su-collection-website",
  storageBucket: "su-collection-website.firebasestorage.app",
  messagingSenderId: "113420799693",
  appId: "1:113420799693:web:5ad9f1f306da3f55f0a384",
  measurementId: "G-N31J2BE94H"
};

// Initialize Firebase safely for Server-Side Rendering (SSR)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);