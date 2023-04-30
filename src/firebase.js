// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBfGYjpBx5ooYLQpOznnDk1qSdoVrL0w3s",
  authDomain: "chat-67a45.firebaseapp.com",
  projectId: "chat-67a45",
  storageBucket: "chat-67a45.appspot.com",
  messagingSenderId: "626189203844",
  appId: "1:626189203844:web:86c30b141792e6ce8ac5d1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()