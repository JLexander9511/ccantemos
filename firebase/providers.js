import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user

        return {
            ok: true,
            displayName, 
            email, 
            photoURL, 
            uid
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return{
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ({displayName, email, password}) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = resp.user

        updateProfile(FirebaseAuth.currentUser,{ displayName })
        
        return{
            ok: true,
            uid, photoURL, email, displayName
        }
        
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const loginWithEmailPassword = async ({ email: correo, password }) => {
    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, correo, password);
        const { displayName, email, photoURL, uid } = resp.user

        return {
            ok: true,
            displayName, 
            email, 
            photoURL, 
            uid
        }
        

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }

    
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut() 
}