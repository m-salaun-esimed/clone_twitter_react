import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tweetReducer from './tweetSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        tweet: tweetReducer,
    },
});

export default store;