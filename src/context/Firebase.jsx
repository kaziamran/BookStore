import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB1GYpIcj5SPYsWD8HudksmtOt4EP6ajbc",
  authDomain: "book-store-64181.firebaseapp.com",
  projectId: "book-store-64181",
  storageBucket: "book-store-64181.firebasestorage.app",
  messagingSenderId: "964037102378",
  appId: "1:964037102378:web:7ecc0171125d11fbab2c53",
  databaseURL: 'https://book-store-64181-default-rtdb.firebaseio.com/',
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {

    const signupUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password)
    };

    const putData = (key, data) => set(ref(database, key), data);

    return (
        <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, putData }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}