import { Button } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { CgProfile } from 'react-icons/cg';

import { useSelector } from 'react-redux';
import { postTweet } from '../../../domains/tweet/tweet';
import Loading from '../../../shared/components/Loading';
import { showToastSuccess } from '../../../shared/utils/Toast';

function ModalPostTweet({ onTweetUpdate }) {
    const [tweet, setTweet] = useState("");
    const token = useSelector((state) => state.auth.token);
    const [isLoading, setIsLoading] = useState(false);
    const userIdSlice = useSelector((state) => state.auth.userId);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!token) {
            console.error("Token is missing");
            return;
        }

        try {
            setIsLoading(true);
            await postTweet(token, userIdSlice, tweet);
            showToastSuccess("Tweet posté !");
            if (onTweetUpdate) {
                onTweetUpdate();
            }
            setTweet("");
        } catch (error) {
            console.error("Failed to post tweet:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Fragment>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="bg-black text-white p-4 sm:p-6 rounded-lg shadow-lg max-w-lg w-full relative bg-opacity-70 z-50">
                    <div className="flex items-start gap-2">
                        <CgProfile className="w-10 h-10 text-white" />
                        <textarea
                            className="w-full h-24 sm:h-32 p-2 border rounded-md bg-black text-white resize-none"
                            placeholder="Quoi de neuf ?!"
                            onChange={(e) => setTweet(e.target.value)}
                            value={tweet}
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button
                            variant="outlined"
                            className="w-full sm:w-auto rounded"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isLoading || !tweet.trim()}
                        >
                            Poster
                        </Button>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default ModalPostTweet;
    