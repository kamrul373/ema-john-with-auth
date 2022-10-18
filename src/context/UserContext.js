import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.init";

export const AuthContext = createContext();

const auth = getAuth(app);

const UserContext = ({ children }) => {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    // register
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // login
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // logout 
    const logOut = () => {
        return signOut(auth);
    }

    // on auth state changed 

    useEffect(() => {
        const unsubsribe = onAuthStateChanged(auth, (currentUser) => [
            setUser(currentUser),
            setLoading(false)
        ]);
        return () => unsubsribe();
    }, []);

    const authInfo = { user, createUser, login, logOut, loading }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default UserContext;