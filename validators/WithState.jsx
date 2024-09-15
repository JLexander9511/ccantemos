"use client";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from '@/store/store';
 
function WithState({ children, loader }) {

    return (
        <Provider store={store}>
            <PersistGate loading={loader} persistor={persistor}>
              {children}
            </PersistGate>
        </Provider>
      )
  }

export default WithState