import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Tweet from '../../../shared/components/Tweet.jsx';
import { showToastError } from '../../../shared/utils/Toast.jsx';
import Loading from '../../../shared/components/Loading.jsx';
import ModalPostTweet from '../../postTweet/components/ModalPostTweet.jsx'
import { ToastContainer } from 'react-toastify';
import { fetchTweets } from '../../../shared/store/tweetSlice.js';

const ListTweet = () => {
    const token = useSelector((state) => state.auth.token);
    const tweets = useSelector((state) => state.tweet.tweets);
    const userIdSlice = useSelector((state) => state.auth.userId);
    const [isLoading, setIsLoading] = useState(true);
    const [filtreTweet, setFiltreTweet] = useState("recent");
    const dispatch = useDispatch();

    const getTweets = async () => {
        try {
            setIsLoading(true);
            await dispatch(fetchTweets({ filtreTweet, token, userId: userIdSlice })).unwrap();
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                showToastError("Veuillez vous reconnecter s'il vous plait.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    

    useEffect(() => {
        if (token) {
            getTweets();
        }
    }, [token, filtreTweet]);

    const handleTweetUpdate = () => {
        getTweets();
    };

    return (
        <Fragment>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-white text-xl font-bold">ACCUEIL</h1>

                <select
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600"
                    onChange={(e) => setFiltreTweet(e.target.value)} 
                    value={filtreTweet}
                >
                    <option value="recent">Les plus récents</option>
                    <option value="popular">Les plus populaires</option>
                    <option value="follow">Abonnements</option>
                </select>
            </div>

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
                theme="light"
            />

            <div className='ml-5'>
                <ModalPostTweet onTweetUpdate={handleTweetUpdate}/>
            </div>
            {isLoading ? (
                <Loading />
            ) : (
                Array.isArray(tweets) && tweets.length > 0 ? (
                    tweets.map((tweet) => (
                        <Tweet
                            key={tweet.id}
                            tweet={tweet}
                            onTweetUpdate={handleTweetUpdate}
                        />
                    ))
                ) : (
                    <p className='text-white'>No tweets available</p>
                )
            )}
        </Fragment>
    );
};

export default ListTweet;
