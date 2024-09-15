import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // , "authenticated", "checking"
        uid: null,
        email: null,
        displayName: null,
        errorMessage: null,
        role: 'regular'
    },
    reducers: {
        checkingCredentials: (state) => {
            state.status = 'checking'
        },
        deleteErrorMessage: (state) => {
            state.errorMessage = null
        },
        login: (state, action) => {

            const {
                displayName, 
                email, 
                photoURL, 
                uid,
                role
            } = action.payload

            state.status = 'authenticated'
            state.uid = uid
            state.email = email
            state.displayName = displayName
            state.photoUrl = photoURL
            state.role = role
            state.errorMessage= null
        },
        logout: (state, {payload}) => {
            state.status= 'not-authenticated'
            state.uid= null
            state.email= null
            state.displayName= null
            state.role= 'regular'
            state.errorMessage= payload.errorMessage
        },
    }
});

export const { checkingCredentials, 
                login, 
                logout,
                deleteErrorMessage } = authSlice.actions;