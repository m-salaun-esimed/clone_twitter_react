import { Button } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiX } from 'react-icons/fi';
import { jwtDecode } from 'jwt-decode';

import { useSelector } from 'react-redux';
import { postTweet } from '../../../domains/tweet/tweet';
import Loading from '../../../shared/components/Loading';

function ModalPostTweet({ setIsModalOpen }) {
    const [tweet, setTweet] = useState("");
    const token = useSelector((state) => state.auth.token);
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!token) {
            console.error("Token is missing");
            return;
        }

        const decoded = jwtDecode(token);

        try {
            setIsLoading(true);
            const response = await postTweet(token, decoded.sub, tweet);
            console.log(response);
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
                <div className="bg-black text-white p-6 rounded-lg shadow-lg w-120 relative bg-opacity-70 border border-white z-50">
                    <form onSubmit={handleSubmit}>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-white bg-transparent border-0"
                        >
                            <FiX className="w-6 h-6" />
                        </button>

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
                            >
                                Poster
                            </Button>
                        </div>
                    </form>
                </div>
            )};
        </Fragment>
    );
}

export default ModalPostTweet;
