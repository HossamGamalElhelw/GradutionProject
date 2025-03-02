import { createContext, useEffect, useState, useContext } from "react";
import { createUserWithEmailAndPassword,
        onAuthStateChanged,
        signOut,
        signInWithEmailAndPassword
        } from "firebase/auth";
import auth from "../FirebaseConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) =>{
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsloading] = useState(true);

    const signup = (email , password) =>{
        try {
            createUserWithEmailAndPassword(auth, email, password);    
        } catch (error) {
            console.log(error);
        }      
    }
    const login = (email, password) => {
        try {
            signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.log(error);
        }
    }
    const logout = () => {
        return signOut(auth);
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) =>{
            setCurrentUser(user);
            setIsloading(false);
        })
        return unsubscribe;
    },[]);
    return(
        <AuthContext.Provider value={{currentUser, signup, logout, login}}>
            {isLoading ? <div className="w-full flex justify-center items-center text-2xl">Loading....</div> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    return useContext(AuthContext);
};

export default AuthProvider;