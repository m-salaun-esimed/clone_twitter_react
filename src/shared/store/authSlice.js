import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { loginApi, registerApi } from '../../domains/authentitification/auth';


export const postLogin = createAsyncThunk(
    'auth/postLogin',
    async ({ trimmedEmail, trimmedPassword, isStayConnectedToggle }, { rejectWithValue }) => {
        console.log("postLogin")
        try {
            const response = await loginApi(trimmedEmail, trimmedPassword);;
            return {"accessToken":response.accessToken,
                    "isStayConnected": isStayConnectedToggle}
        } catch (error) {
            return rejectWithValue(error.response?.data || "Erreur inconnue");
        }
    }
);

export const postRegister = createAsyncThunk(
    'auth/postRegister',
    async ({ email, password, isStayConnectedToggle }, { rejectWithValue }) => {
        try {
            const response = await registerApi(email, password);;
            return {"accessToken":response.accessToken,
                    "isStayConnected": isStayConnectedToggle}
        } catch (error) {
            return rejectWithValue(error.response?.data || "Erreur inconnue");
        }
    }
);

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
        status: 'idle',
        error: null
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
        setUserId(state, action) {
            state.userId = action.payload;
            console.log("dans setUserId: ", action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postLogin.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(postLogin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                AuthSlice.caseReducers.setIsStayConnected(state, { payload: action.payload.isStayConnected });
                AuthSlice.caseReducers.setIsConnected(state, { payload: true });
                AuthSlice.caseReducers.setToken(state, { payload: action.payload.accessToken });
            })
            .addCase(postLogin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            //Register
            .addCase(postRegister.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(postRegister.fulfilled, (state, action) => {
                state.status = 'succeeded';
                AuthSlice.caseReducers.setIsStayConnected(state, { payload: action.payload.isStayConnected });
                AuthSlice.caseReducers.setIsConnected(state, { payload: true });
                AuthSlice.caseReducers.setToken(state, { payload: action.payload.accessToken });
            })
            .addCase(postRegister.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    },
});

export default AuthSlice.reducer;
export const { setUser, setIsConnected, setToken, setIsStayConnected, setUserId } = AuthSlice.actions;