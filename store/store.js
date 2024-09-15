import { configureStore, combineReducers,  } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist';
import storage from './storage';
import { authSlice } from './auth'
import { appSlice } from './app';

const persistConfig = {
  key: 'app',
  storage
}

 const rootReducer = combineReducers({ 
    auth: authSlice.reducer,
    app: appSlice.reducer // AQUI SE PUEDEN AÑAdIR LOS DEMAS REDUCERS
 })

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
 
export const persistor = persistStore(store)
