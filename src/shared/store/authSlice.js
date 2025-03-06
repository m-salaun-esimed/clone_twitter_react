import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { loginApi, registerApi } from '../../domains/authentitification/auth';

export const postLogin = createAsyncThunk(
    'auth/postLogin',
    async ({ trimmedEmail, trimmedPassword, isStayConnectedToggle }, { rejectWithValue }) => {
        try {
            const response = await loginApi(trimmedEmail, trimmedPassword);
            return {
                accessToken: response.accessToken,
                isStayConnected: isStayConnectedToggle
            };
        } catch (error) {
            return rejectWithValue(error.response?.data || "Erreur inconnue");
        }
    }
);

export const postRegister = createAsyncThunk(
    'auth/postRegister',
    async ({ email, password, isStayConnectedToggle }, { rejectWithValue }) => {
        try {
            const response = await registerApi(email, password);
            return {
                accessToken: response.accessToken,
                isStayConnected: isStayConnectedToggle
            };
        } catch (error) {
            return rejectWithValue(error.response?.data || "Erreur inconnue");
        }
    }
);

// Fonction pour récupérer userId depuis un token
const getUserIdFromToken = (token) => {
    try {
        return token ? jwtDecode(token).sub : null;
    } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
        return null;
    }
};

const isStayConnected = localStorage.getItem("isStayConnected") === "true";
const token = isStayConnected
    ? localStorage.getItem("accessToken")
    : sessionStorage.getItem("accessToken");

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        userId: getUserIdFromToken(token),
        isStayConnected: isStayConnected,
        isConnected: !!token,
        token: token,
        status: 'idle',
        error: null
    },
    reducers: {
        setUser: (state, action) => {
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
            state.userId = getUserIdFromToken(state.token);
        },
        setIsStayConnected: (state, action) => {
            state.isStayConnected = action.payload;
            localStorage.setItem("isStayConnected", String(action.payload));
        },
        setUserId(state, action) {
            state.userId = action.payload;
        },
        disconnect(state) {
            state.token = undefined;
            state.userId = null;
            state.isConnected = false;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("isStayConnected");
            sessionStorage.removeItem("accessToken");
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
                console.log("isStayConnected : ", action.payload.isStayConnected);
                AuthSlice.caseReducers.setIsStayConnected(state, { payload: action.payload.isStayConnected });
                AuthSlice.caseReducers.setIsConnected(state, { payload: true });
                AuthSlice.caseReducers.setToken(state, { payload: action.payload.accessToken });
            })
            .addCase(postLogin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
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
            });
    },
});

export default AuthSlice.reducer;
export const { setUser, setIsConnected, setToken, setIsStayConnected, setUserId, disconnect } = AuthSlice.actions;
