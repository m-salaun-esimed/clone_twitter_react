import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tweetReducer from './tweetSlice';
import notificationReducer from './notificationSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        tweet: tweetReducer,
        notification: notificationReducer
    },
});

export default store;