import { Button } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiX } from 'react-icons/fi';

import { useSelector } from 'react-redux';
import { postTweet } from '../../../domains/tweet/tweet';
import Loading from '../../../shared/components/Loading';
import { showToastSuccess } from '../../../shared/utils/Toast';
import { ToastContainer } from 'react-toastify';

function ModalPostTweet({ onTweetUpdate }) {
    const [tweet, setTweet] = useState("");
    const token = useSelector((state) => state.auth.token);
    const [isLoading, setIsLoading] = useState(false);
    const userIdSlice = useSelector((state)=>state.auth.userId)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!token) {
            console.error("Token is missing");
            return;
        }

        try {
            setIsLoading(true);
            const response = await postTweet(token, userIdSlice, tweet);
            console.log(response);
            if(onTweetUpdate){
                onTweetUpdate()
            }
            showToastSuccess("Tweet posté !");
            handleTweetUpdate();
        } catch (error) {
            console.error("Failed to post tweet:", error);
        } finally {
            setIsLoading(false);
            setIsModalOpen(false);
        }
    };

    return (
        <Fragment>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="bg-black text-white p-6 rounded-lg shadow-lg w-120 relative bg-opacity-70    z-50">
                    <div className="flex mt-4">
                        <CgProfile className="w-10 h-10 text-white mr-2" />
                        <textarea
                            className="w-full h-32 p-2 border rounded-md bg-black text-white"
                            placeholder="Quoi de neuf ?!"
                            onChange={(e) => setTweet(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button
                            variant="outlined"
                            className="w-full rounded"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Poster
                        </Button>
                    </div>
                </div>
            )};
        </Fragment>
    );
}

export default ModalPostTweet;
