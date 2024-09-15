import { createSlice } from '@reduxjs/toolkit';


export const appSlice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle', // , "processing", "error", "success", "querying", "queryDone"
        message: null,
        last5Songs: [],
        last5Masses: [],
        songData: {}
    },
    reducers: {
        deleteMessage: (state) => {
            state.message = null
        },

        startProcess: (state) => {
            state.status = 'processing'
        },

        processFinishedUnsuccessfully: (state, {payload}) => {
            state.status = 'error'
            state.message = payload
        },

        processFinishedSuccessfully: (state, {payload}) => {
            state.status = 'success'
            state.message = payload
        },

        setIdle: (state) => {
            state.status = 'idle'
        },

        setQuerying: (state) => {
            state.status = 'querying'
        },

        queryDone: (state) => {
            state.status = 'queryDone'
        },

        fillLastSongs: (state, {payload}) => {
            state.last5Songs = payload
        },
        fillLastMasses: (state, {payload}) => {
            state.last5Masses = payload
        },

        fillSongData: (state, {payload}) => {
            state.songData = payload
        },

    }
});

export const { startProcess, 
               processFinishedUnsuccessfully,
               processFinishedSuccessfully, 
               setIdle, 
               setQuerying, 
               fillLastSongs, 
               queryDone,
               deleteMessage,
               fillSongData,
               fillLastMasses
            } = appSlice.actions;