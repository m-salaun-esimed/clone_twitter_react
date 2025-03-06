import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { editTweetUser, getRecentTweets, getTopLikedTweets, getTopLikedTweetsByUser, getTweetByUser, getTweetsFollowByOrderDesc } from '../../domains/tweet/tweet.js';
import { getFollowsIds } from '../../domains/follow/follow.js';

export const fetchTweets = createAsyncThunk(
    'tweet/fetchTweets',
    async ({ filtreTweet, token, userId }, { rejectWithValue }) => {
        try {
            let response;
            if (filtreTweet === "recent") {
                response = await getRecentTweets(token);
            } else if (filtreTweet === "popular") {
                response = await getTopLikedTweets(token);
            } else if (filtreTweet === "follow") {
                const followsId = await getFollowsIds(token, userId);
                response = await getTweetsFollowByOrderDesc(token, followsId);
            }
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Erreur inconnue");
        }
    }
);

export const fetchTweetsByUser = createAsyncThunk(
    'tweet/fetchTweetsByUser',
    async ({ filtreTweet, token, userId }, { rejectWithValue }) => {
        try {
            let response;
            if (filtreTweet === "recent") {
                response = await getTweetByUser(token, userId);
            } else if (filtreTweet === "popular") {
                response = await getTopLikedTweetsByUser(token, userId);
            }
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Erreur inconnue");
        }
    }
);

export const editTweet = createAsyncThunk(
    'tweet/editTweet',
    async ({ tweetId, editedContent, token }, { rejectWithValue }) => {
        try {
            await editTweetUser(token, tweetId, editedContent).unwrap();
        } catch (error) {
            return rejectWithValue(error.response?.data || "Erreur inconnue");
        }
    }
);

const TweetSlice = createSlice({
    name: 'tweet',
    initialState: {
        tweets: null,
        status: 'idle',
        error: null
    },
    reducers: {
        setTweets: (state, action) => {
            state.tweets = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetchTweets
            .addCase(fetchTweets.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTweets.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tweets = action.payload;
            })
            .addCase(fetchTweets.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // fetchTweetsByUser
            .addCase(fetchTweetsByUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTweetsByUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tweets = action.payload;
            })
            .addCase(fetchTweetsByUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
});

export default TweetSlice.reducer;
export const { setTweets } = TweetSlice.actions;
