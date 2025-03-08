import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../domains/auth/slice.js';

const store = configureStore({
    reducer: {
        auth: authReducer
    },
});

export default store;