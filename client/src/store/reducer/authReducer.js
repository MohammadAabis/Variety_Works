import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
    loginTimestamp: null,
};

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
            state.loginTimestamp = new Date().getTime();
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.loginTimestamp = null;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { loginSuccess, logout, loginFailure } = authReducer.actions;
export default authReducer.reducer;
