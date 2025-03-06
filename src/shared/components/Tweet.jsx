import React, { Fragment, useEffect, useState } from 'react';
import { formatDate } from "../utils/formatDate.js";
import { getName } from '../../domains/user/user.js';
import { CgProfile } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkIfLiked, likeTweet, deleteLikeTweet, getNbrLike } from '../../domains/tweet/likeTweet.js';
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { deleteTweet } from '../../domains/tweet/tweet.js';
import { showToastError, showToastSuccess } from '../utils/Toast.jsx';
import { editTweet } from '../store/tweetSlice.js';
import { addNotificationLike } from '../../domains/user/notification.js';

function Tweet({ tweet, onTweetUpdate }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userIdSlice = useSelector((state) => state.auth.userId);
    const token = useSelector((state) => state.auth.token);
    const [userName, setUserName] = useState("Chargement...");
    const [isLiked, setIsLiked] = useState(false);
    const [nbrLike, setNbrLike] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(tweet.content);

    useEffect(() => {
        const checkIfUserLiked = async () => {
            const liked = await checkIfLiked(tweet.id, userIdSlice, token);
            setIsLiked(liked);
        };

        const getNameApi = async () => {
            const name = await getName(tweet.userId, token);
            setUserName(name.email);
        };

        const getNbrLikeApi = async () => {
            const nbrLike = await getNbrLike(tweet.id, token);
            setNbrLike(nbrLike);
        };

        getNbrLikeApi();
        checkIfUserLiked();
        getNameApi();
    }, [tweet.id, userIdSlice, token, nbrLike, isLiked]);

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num;
    };

    const navigateToProfile = () => navigate(`/profile/${tweet.userId}`);

    const handleLike = async () => {

        if (isLiked) {
            await deleteLikeTweet(tweet.id, userIdSlice, token);
            setIsLiked(false);
        } else {
            await likeTweet(tweet.id, userIdSlice, token);
            await addNotificationLike(tweet.id, userIdSlice);
            setIsLiked(true);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce tweet ?')) {
            try {
                await deleteTweet(token, tweet.id);
                showToastSuccess("Tweet supprimé avec succès !");
                onTweetUpdate?.();
            } catch (error) {
                showToastError("Erreur lors de la suppression du tweet");
            }
        }
    };

    const handleEdit = async () => {
        if (isEditing) {
            dispatch(editTweet({ token, tweetId: tweet.id, editedContent }));
            showToastSuccess("Tweet modifié avec succès !");
            setIsEditing(false);
            onTweetUpdate?.();
        } else {
            setIsEditing(true);
        }
    };

    return (
        <Fragment>
            <div className="bg-gray-50 dark:bg-black p-4 flex justify-center">
                <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border w-full max-w-xl sm:max-w-2xl lg:max-w-4xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <a onClick={navigateToProfile}>
                                <CgProfile className="w-10 h-10 text-gray-400 dark:text-white cursor-pointer" />
                            </a>
                            <span className="text-black dark:text-white font-bold">{userName}</span>
                        </div>
                        <img src="/images/twitter-removebg-preview.png" alt="Twitter Logo" className="h-8 w-8" />
                    </div>

                    {isEditing ? (
                        <div className="mt-3">
                            <textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                className="w-full p-2 text-black dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg resize-none"
                                rows="3"
                            />
                            <div className="flex justify-end mt-2 space-x-2">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleEdit}
                                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                                >
                                    Sauvegarder
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-black dark:text-white text-lg sm:text-xl mt-3">{tweet.content}</p>
                    )}

                    <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base py-1">{formatDate(tweet.date)}</p>

                    <div className="border-gray-200 dark:border-gray-600 border my-1"></div>

                    <div className="flex flex-wrap items-center mt-3 text-gray-500 dark:text-gray-400 gap-4">
                        <div className="flex items-center space-x-1">
                            <button onClick={handleLike} className="focus:outline-none">
                                {isLiked ? <IoHeartSharp className="text-red-500 w-6 h-6" /> : <IoHeartOutline className="w-6 h-6" />}
                            </button>
                            <span>{formatNumber(nbrLike)}</span>
                        </div>

                        <div className="flex items-center space-x-1">
                            <svg className="fill-current w-6 h-6" viewBox="0 0 24 24">
                                <g>
                                    <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788z"></path>
                                </g>
                            </svg>
                            <span>{formatNumber(tweet.comments)}</span>
                        </div>

                        {userIdSlice === tweet.userId && (
                            <div className="flex space-x-2">
                                <button onClick={handleEdit} className="text-blue-500 hover:text-blue-700">
                                    <FaEdit size={20} />
                                </button>
                                <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
                                    <FaTrash size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Tweet;
