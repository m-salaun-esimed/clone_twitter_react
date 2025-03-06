import React, { Fragment, useEffect, useState } from 'react';
import { formatDate } from "../utils/formatDate.js"
import { getName } from '../../domains/user/user.js';
import { CgProfile } from 'react-icons/cg';
import { IoIosList } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkIfLiked, likeTweet, deleteLikeTweet, getNbrLike } from '../../domains/tweet/likeTweet.js';
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { deleteTweet, editTweet } from '../../domains/tweet/tweet.js';
import { showToastError, showToastSuccess } from '../utils/Toast.jsx';
import { ToastContainer } from 'react-toastify';

function Tweet({ tweet, onTweetUpdate }) {
    const navigate = useNavigate();
    const userIdSlice = useSelector((state) => state.auth.userId)
    const token = useSelector((state) => state.auth.token)
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
        }

        const getNbrLikeApi = async () => {
            const nbrLike = await getNbrLike(tweet.id, token);
            console.log("nbrLike : ", nbrLike);
            setNbrLike(nbrLike);
        }

        checkIfUserLiked();
        getNameApi();
        getNbrLikeApi()
    }, [tweet.id, userIdSlice, token, nbrLike, isLiked]);

    const formatLikes = (likes) => {
        if (likes >= 1000000) {
            return (likes / 1000000).toFixed(1) + 'M';
        } else if (likes >= 1000) {
            return (likes / 1000).toFixed(1) + 'K';
        } else {
            return likes;
        }
    };

    const formatCommentaire = (comments) => {
        if (comments >= 1000000) {
            return (comments / 1000000).toFixed(1) + 'M';
        } else if (comments >= 1000) {
            return (comments / 1000).toFixed(1) + 'K';
        } else {
            return comments;
        }
    };

    const navigateToProfile = () => {
        navigate(`/profile/${tweet.userId}`);
    };

    const handleLike = async () => {
        if (isLiked) {
            await deleteLikeTweet(tweet.id, userIdSlice, token)
            setIsLiked(false);
        } else {
            await likeTweet(tweet.id, userIdSlice, token);
            setIsLiked(true);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce tweet ?')) {
            try {
                await deleteTweet(token, tweet.id);
                showToastSuccess("Tweet supprimé avec succès !")
                if (onTweetUpdate) {
                    onTweetUpdate();
                }
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                showToastError("Erreur lors de la suppression du tweet");
            }
        }
    };

    const handleEdit = async () => {
        if (isEditing) {
            try {
                await editTweet(token, tweet.id, editedContent);
                showToastSuccess("Tweet modifié avec succès !")
                setIsEditing(false);
                if (onTweetUpdate) {
                    onTweetUpdate();
                }
            } catch (error) {
                console.error('Erreur lors de la modification:', error);
                showToastError("Erreur lors de la modification du tweet");
            }
        } else {
            setIsEditing(true);
        }
    };

    return (
        <Fragment>
            <div className="bg-gray-50 dark:bg-black p-5 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border max-w-4xl w-full">
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <div className="flex ml-1.5 text-sm leading-tight">
                                <a onClick={navigateToProfile}><span className="text-gray-500 dark:text-gray-400 font-normal block mr-2"><CgProfile className="w-10 h-10 text-white mr-2" /></span></a>
                                <span className="text-black dark:text-white font-bold block mt-3 mr-3">{userName}</span>
                            </div>
                        </div>
                        <img src="/images//twitter-removebg-preview.png" alt="" className='h-8 w-8' />
                    </div>
                    {isEditing ? (
                        <div className="mt-3">
                            <textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                className="w-full p-2 text-black dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg"
                                rows="4"
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
                        <p className="text-black dark:text-white block text-xl leading-snug mt-3">{tweet.content}</p>
                    )}
                    <p className="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">{formatDate(tweet.date)}</p>
                    <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1"></div>
                    <div className="text-gray-500 dark:text-gray-400 flex mt-3">
                        <div className="flex items-center mr-6">
                            <button onClick={handleLike}>
                                {isLiked ? <IoHeartSharp color='red' /> : <IoHeartOutline />}
                            </button>
                            <span className="ml-3" >{formatLikes(nbrLike)} </span>
                        </div>
                        <div className="flex items-center mr-6">
                            <svg className="fill-current h-5 w-auto" viewBox="0 0 24 24">
                                <g>
                                    <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                                </g>
                            </svg>
                            <span className="ml-3">{formatCommentaire(tweet.comments)} personnes ont commenté(s)</span>
                        </div>
                        {userIdSlice === tweet.userId && (
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleEdit}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <FaEdit size={20} />
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="text-red-500 hover:text-red-700"
                                >
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
