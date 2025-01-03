import { configureStore } from '@reduxjs/toolkit';
import authReducer, { logout } from '../store/reducer/authReducer';
import storageSession from 'redux-persist/lib/storage/session';
// import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'auth',
    storage: storageSession,
    // storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);


const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(expirationMiddleware),
});

export const persistor = persistStore(store);
export default store;
