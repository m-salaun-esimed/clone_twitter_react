import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNotificationFollow, getRecentNotificationByUser } from "../../domains/user/notification";

export const fetchNotificationsFollow = createAsyncThunk(
    'notification/fetchNotificationsFollow',
    async ({ userId }, { rejectWithValue }) => {
        console.log("userId dans slice :", userId)
        try {
            const response = await getRecentNotificationByUser(userId);
            console.log("response fetchNotifications", response)
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Erreur inconnue");
        }
    }
);

export const setNotificationsFollow = createAsyncThunk(
    'notification/setNotificationsFollow',
    async ({ userIdfollower, userIdfollowed }, { rejectWithValue }) => {
        try {
            addNotificationFollow(userIdfollower, userIdfollowed);
        } catch (error) {
            return rejectWithValue(error.response?.data || "Erreur inconnue");
        }
    }
);

const NotificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: null,
        status: 'idle',
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotificationsFollow.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchNotificationsFollow.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notifications = action.payload;
            })
            .addCase(fetchNotificationsFollow.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

        //setNotificationsFollow
    }
});

export default NotificationSlice.reducer;