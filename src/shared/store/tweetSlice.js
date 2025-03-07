import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { editTweetUser, getRecentTweets, getTopLikedTweets, getTopLikedTweetsByUser, getTweetByUser, getTweetsFollowByOrderDesc, updateTweet } from '../../domains/tweet/tweet.js';
import { getFollowsIds } from '../../domains/follow/follow.js';
import { deleteComment, postComment } from '../../domains/tweet/commentTweet.js';
import { showToastSuccess } from '../utils/Toast.jsx';

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

export const addComment = createAsyncThunk(
    'tweet/addComment',
    async ({ tweetId, content, userId }, { rejectWithValue }) => {
        try {
            await postComment(tweetId, content, userId);
            return { tweetId };
        } catch (error) {
            return rejectWithValue(error.response?.data || "Erreur inconnue");
        }
    }
);
export const updateTweetAfterComment = createAsyncThunk(
    'tweet/updateTweetAfterComment',
    async ({ tweetId }, { rejectWithValue }) => {
        console.log("updateTweetAfterComment")
        try {
            const response = await updateTweet(tweetId);
            console.log("response ;", response)

            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Erreur inconnue");
        }
    }
);

export const deleteCommentSlice = createAsyncThunk(
    'tweet/deleteCommentSlice',
    async ({ commentId }, { rejectWithValue }) => {
        try {
            const response = await deleteComment(commentId);
            console.log("response ;", response)
            return response;
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
            //addComments
            .addCase(addComment.fulfilled, (state, action) => {
                showToastSuccess("Commentaire posté !");
            })
            .addCase(addComment.rejected, (state, action) => {
                toast.error("Erreur lors de la publication du commentaire.");
                state.error = action.payload;
            })
            //deleteComment
            .addCase(deleteCommentSlice.fulfilled, (state, action) => {
                showToastSuccess("Commentaire supprimé !");
            })
            //update comment
            .addCase(updateTweetAfterComment.fulfilled, (state, action) => {
                if (state.tweets && Array.isArray(action.payload) && action.payload.length > 0) {
                    const updatedTweet = action.payload[0];
                    const index = state.tweets.findIndex(tweet => tweet.id === updatedTweet.id);
                    if (index !== -1) {
                        state.tweets[index] = updatedTweet;
                    }
                }
            })            
    }
});

export default TweetSlice.reducer;
export const { setTweets } = TweetSlice.actions;
