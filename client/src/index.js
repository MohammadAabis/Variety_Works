import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store, {persistor} from './store';
import { logout } from './store/reducer/authReducer';


// Function to check for session expiration on app load
const rehydrateAndExpireCheck = (store) => {
  const state = store.getState();
  const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const currentTime = new Date().getTime();
  const loginTimestamp = state.auth.loginTimestamp;

  if (state.auth.isAuthenticated && loginTimestamp && currentTime - loginTimestamp > EXPIRATION_TIME) {
    store.dispatch(logout()); 
  }
};

// Run expiration check on app start
rehydrateAndExpireCheck(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <React.StrictMode> */}
        <App />
      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
