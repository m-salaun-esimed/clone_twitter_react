import { createSlice } from "@reduxjs/toolkit";

const NotificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notification: null,
        status: 'idle',
        error: null
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        
    }
});

export default NotificationSlice.reducer;
export const { setTweets } = NotificationSlice.actions;