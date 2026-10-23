import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyB1GYpIcj5SPYsWD8HudksmtOt4EP6ajbc",
  authDomain: "book-store-64181.firebaseapp.com",
  projectId: "book-store-64181",
  storageBucket: "book-store-64181.firebasestorage.app",
  messagingSenderId: "964037102378",
  appId: "1:964037102378:web:7ecc0171125d11fbab2c53",
  databaseURL: 'https://book-store-64181-default-rtdb.firebaseio.com/'
};

export const app = initializeApp(firebaseConfig);