import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        userId: localStorage.getItem("accessToken") ? jwtDecode(localStorage.getItem("accessToken")).sub : null,
        isStayConnected: localStorage.getItem("isStayConnected") === "true",
        isConnected: localStorage.getItem("isStayConnected") === "true"
            ? !!localStorage.getItem("accessToken")
            : !!sessionStorage.getItem("accessToken"),
        token: localStorage.getItem("isStayConnected") === "true"
            ? localStorage.getItem("accessToken")
            : sessionStorage.getItem("accessToken"),
    },
    reducers: {
        setUser: (state, action) => {
            console.log("action : ", action);
            state.user = action.payload;
        },
        setIsConnected: (state, action) => {
            state.isConnected = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            if (state.isStayConnected) {
                localStorage.setItem("accessToken", state.token);
                sessionStorage.removeItem("accessToken");
            } else {
                sessionStorage.setItem("accessToken", state.token);
                localStorage.removeItem("accessToken");
            }
        },
        setIsStayConnected: (state, action) => {
            state.isStayConnected = action.payload;
            localStorage.setItem("isStayConnected", String(action.payload));
        },
        setUserId(state, action){
            state.userId = action.payload;
            console.log("dans setUserId: ", action.payload)
        }
    }
});

export default AuthSlice.reducer;
export const { setUser, setIsConnected, setToken, setIsStayConnected, setUserId} = AuthSlice.actions;