// Importa i moduli necessari da Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB2-cmHpF7MMJyT0mFdxp52xpD4gRGT7NI",
  authDomain: "prendi-il-tempo.firebaseapp.com",
  projectId: "prendi-il-tempo",
  storageBucket: "prendi-il-tempo.firebasestorage.app",
  messagingSenderId: "887701956551",
  appId: "1:887701956551:web:0e6e06f804251983aa9be2"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Ottieni l'istanza del database Firestore
export const db = getFirestore(app);

// Ottieni l'istanza per l'autenticazione
export const auth = getAuth(app);
