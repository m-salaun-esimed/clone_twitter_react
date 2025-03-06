import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNotificationFollow, getNotificationLike, getRecentNotificationByUser } from "../../domains/user/notification";

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

export const fetchNotificationsLike  = createAsyncThunk(
    'notification/fetchNotificationsLike',
    async ({ userId }, { rejectWithValue }) => {
        console.log("dans fetchNotificationsLike")
        try {
            const response = await getNotificationLike(userId);
            console.log("fetchNotificationsLike : ", response)
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
        notificationsLike: null,
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
            .addCase(fetchNotificationsLike.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notificationsLike = action.payload;
            })
    }
});

export default NotificationSlice.reducer;