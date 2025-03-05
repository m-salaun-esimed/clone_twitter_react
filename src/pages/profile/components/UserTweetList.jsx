import React, { Fragment, useEffect, useState } from 'react';
import { getTweetByUser, getTopLikedTweetsByUser } from "../../../domains/tweet/tweet.js";
import { useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";
import { showToastError } from '../../../shared/utils/Toast.jsx';
import Tweet from '../../../shared/components/Tweet.jsx';
import Loading from '../../../shared/components/Loading.jsx';

function UserTweetList({ userId }) {
    const token = useSelector((state) => state.auth.token);
    const [filtreTweet, setFiltreTweet] = useState("recent");
    const userIdSlice = useSelector((state) => state.auth.userId);
    const [isLoading, setIsLoading] = useState(true);
    const [tweets, setTweets] = useState([]);

    const getTweetsApi = async () => {
        console.log("dans getTweetApi")
        try {
            setIsLoading(true);
            let response;
            if (filtreTweet === "recent") {
                response = await getTweetByUser(token, userId);
            } else if (filtreTweet === "popular") {
                response = await getTopLikedTweetsByUser(token, userId);
            }
            setTweets(response);
            console.log(tweets)
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                showToastError("Veuillez vous reconnecter s'il vous plaît.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            getTweetsApi();
        }
    }, [token, filtreTweet, userId]);

    const handleTweetUpdate = () => {
        getTweetsApi();
    };

    return (
        <Fragment>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                zIndex={1000}
            />


            <div className="flex justify-between items-center mb-4">
                <div className="flex">
                    <p className="text-white">{tweets.length} posts</p>
                </div>
                <select className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600"
                    onChange={(e) => setFiltreTweet(e.target.value)}
                    value={filtreTweet}>
                    <option value="recent">Les plus récents</option>
                    <option value="popular">Les plus populaires</option>
                </select>
            </div>

            {isLoading ? (
                <Loading />
            ) : (
                <div className="space-y-4">
                    {tweets.length > 0 ? (
                        tweets.map((tweet) => <Tweet
                            key={tweet.id}
                            tweet={tweet}
                            onTweetUpdate={handleTweetUpdate}
                        />)
                    ) : (
                        <p className="text-gray-400 text-center">Aucun tweet posté</p>
                    )}
                </div>
            )}
        </Fragment>
    );
}

export default UserTweetList;
