import { createSlice } from '@reduxjs/toolkit';

const TweetSlice = createSlice({
    name: 'tweet',
    initialState: {
        tweets: null,
    },
    reducers: {
        setTweets: (state, action) => {
            state.tweets = action.payload;
        }
    }
});

export default TweetSlice.reducer;
export const { setTweets } = TweetSlice.actions;