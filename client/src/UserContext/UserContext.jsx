import React from 'react';
import { createContext } from 'react';
import {getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword
, GoogleAuthProvider , GithubAuthProvider , onAuthStateChanged , signInWithPopup , 
updateProfile} from "firebase/auth" ;
import app from '../firebase.config/firebase.config';
import { useState } from 'react';
export const AuthProvider = createContext() ;
const auth = getAuth(app) ;

const UserContext = ({children}) => {
//get user info
const [user , setUser] = useState({}) ;
//current user
const [currentUser , setCurrentUser ]  = useState({}) ;
//google auth provider
const googleProvider = new GoogleAuthProvider() ;
//github auth provider
const githubProvider = new GithubAuthProvider() ;
//create new user 
const createUser = (email , password) => {
return createUserWithEmailAndPassword(auth , email , password) ;
}
//update user profile
const updateUserProfile =  (name , profile ) => {
return updateProfile(auth.currentUser , {
displayName:name ,
photoURL : profile ,
})
}
//login user 
const loginUser = (email , password) => {
return signInWithEmailAndPassword(auth , email , password) ;
} 
//googel sign in
const googelSignIn = () =>{
return signInWithPopup(auth , googleProvider) ;
}
//github sign in 
const githubSignIn = () => {
return signInWithPopup(auth , githubProvider) ;
}
//get user information by on auth state change 
React.useEffect(() => {
const unsubscribe = onAuthStateChanged(auth , (userInfo) =>{
if(userInfo){
return setUser(userInfo) ;
}
})
return () => unsubscribe() ;
}, []);
//log out user 
const logOutUser = () =>{
return auth.signOut() ;
}

//get specific user from mongoDB
const loginEmail = user?.email ;

React.useEffect(() => {
    fetch(`https://resell-products-subrota22.vercel.app/users/${loginEmail}`)
    .then(res => res.json())
    .then(data => setCurrentUser(data) ) 
    .catch(error => console.log("Error : " + error ) ) ;
    
}, [loginEmail]);

//share data with all components
const authInformation = {
createUser , loginUser , user  , setUser ,  updateUserProfile , logOutUser , 
googelSignIn , githubSignIn , currentUser
} ;
return (
    <React.Fragment>
    <AuthProvider.Provider value={authInformation}>
        {children}
    </AuthProvider.Provider>
</React.Fragment>
)
};

export default UserContext;