import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAYra3pzDAdBs54_FcHAF-Hdc9GX5GfOz4",
  authDomain: "gen-lang-client-0253481342.firebaseapp.com",
  projectId: "gen-lang-client-0253481342",
  storageBucket: "gen-lang-client-0253481342.firebasestorage.app",
  messagingSenderId: "1083895887912",
  appId: "1:1083895887912:web:d7df8f0cc9b3a96656dd1d"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app, "ai-studio-sucollection-c53f4233-58b2-4ddd-ba23-9a5a088edc61");
export const auth = getAuth(app);
