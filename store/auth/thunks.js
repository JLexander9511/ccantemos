import { FirebaseApp, loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "@/firebase"
import { checkingCredentials, logout, login, authenticate, deleteErrorMessage } from "./authSlice"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { processFinishedSuccessfully, processFinishedUnsuccessfully, startProcess } from "../app";

const db = getFirestore();
const moment = require('moment');

export const checkingAuthentication = () => {
    return async (dispatch) => {
        dispatch( checkingCredentials() )
    }
}

export const clearErrorMessage = () => {
    return async (dispatch) => {
        dispatch( deleteErrorMessage() )
    }
}

export const startCreatingUserWithEmailPassword = ({displayName, email, password}) => {
    return async ( dispatch ) => {

        try {
            dispatch( startProcess() );

            const resp = await registerUserWithEmailPassword({displayName, email, password})

            const {ok, uid, photoURL, errorMessage} = resp
            if( !ok ) throw new Error(errorMessage)

            const role = 'regular';

            await setDoc(doc(db, "users", uid), {
                                id: uid,    
                                displayName: displayName,
                                status: 'active',
                                date: moment().format('L'),
                                role: role
                            })

            dispatch( login({displayName, email, uid, photoURL, role}) );
            dispatch( processFinishedSuccessfully(new String('Proceso realizado con exito')) );

        } catch (error) {
            dispatch( logout({error}) )
            dispatch( processFinishedUnsuccessfully() );
        }
        
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch( checkingCredentials() )

        const result = await signInWithGoogle()
        if(!result.ok) return dispatch( logout(result.errorMessage) )

        dispatch( login(result) )

        
        /*TAMBIEN ES VALIDO
         if(!result.ok) {
            dispatch( logout(result.errorMessage) )
        } else {
            dispatch( login(result) )
        }
        
        */ 
        
        
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async ( dispatch ) => {

        try {
            dispatch( startProcess() );

            const resp = await loginWithEmailPassword({ email, password })

            if(!resp.ok) return dispatch( logout(resp.errorMessage) )

            const user = await getDoc(doc(db, 'users', resp.uid));

            dispatch( login({...resp, role: user.data().role}) )
            dispatch( processFinishedSuccessfully(new String('Proceso realizado con exito')) );

        } catch (error) {
            dispatch( logout(error.message) )
            dispatch( processFinishedUnsuccessfully(error.message) );
        }
        
    }
}

export const startLogout = () => {
    return async ( dispatch ) => {
        await logoutFirebase
        dispatch( logout('LoggedOut') )
    }
}

