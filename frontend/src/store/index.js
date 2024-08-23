import {createSlice , configureStore } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {user:"", isLoggedIn: false },
    reducers: {
        login(state){
            state.isLoggedIn = true;
        },
        logout(state){
            sessionStorage.clear("id");
            state.isLoggedIn = false;
        },
    },
});

export const authActions = authSlice.actions;

export const store = configureStore({
    reducer: authSlice.reducer,
});