// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ4BOzRapf8n5SF0cepYZZwZLYmpR5MlY",
  authDomain: "todo-9572e.firebaseapp.com",
  projectId: "todo-9572e",
  storageBucket: "todo-9572e.appspot.com",
  messagingSenderId: "64892976921",
  appId: "1:64892976921:web:5a92a52c53f4f938334f88",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
