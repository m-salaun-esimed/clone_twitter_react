import React, { Fragment, useEffect, useState } from 'react';
import { getName } from '../../domains/user/user';
import { useDispatch, useSelector } from 'react-redux';
import { IoAddOutline } from "react-icons/io5";
import { Button, Dialog, DialogActions, TextField, Avatar, Typography } from '@mui/material';
import { CgProfile } from 'react-icons/cg';
import { addComment, deleteCommentSlice, updateTweetAfterComment } from '../store/tweetSlice';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate

function Commentaires({ tweet, userName }) {
    const token = useSelector((state) => state.auth.token);
    const userIdSlice = useSelector((state) => state.auth.userId);
    const [commentUsers, setCommentUsers] = useState({});
    const [open, setOpen] = useState(false);
    const [newComment, setNewComment] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Déclaration de navigate

    useEffect(() => {
        const fetchNames = async () => {
            const names = {};
            for (const commentaire of tweet.comments) {
                if (!commentUsers[commentaire.userId]) {
                    const user = await getName(commentaire.userId, token);
                    names[commentaire.userId] = user.email;
                }
            }
            setCommentUsers((prev) => ({ ...prev, ...names }));
        };

        fetchNames();
    }, [tweet.comments, token]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewComment("");
    };

    const handleAddComment = () => {
        console.log("Nouveau commentaire :", newComment);

        dispatch(addComment({ tweetId: tweet.id, content: newComment, userId: userIdSlice }))
            .unwrap()
            .then(() => {
                dispatch(updateTweetAfterComment({ tweetId: tweet.id }));
            })
            .catch((error) => {
                console.error("Erreur lors de l'ajout du commentaire :", error);
            });

        handleClose();
    };

    const handleDelete = (commentId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce tweet ?')) {
            console.log("Deleting comment with ID:", commentId);
            dispatch(deleteCommentSlice({ commentId }))
            .unwrap()
            .then(() => {
                dispatch(updateTweetAfterComment({ tweetId: tweet.id }));
            })
            .catch((error) => {
                console.error("Erreur lors de l'ajout du commentaire :", error);
            });
        }
    };

    // Fonction pour rediriger vers le profil
    const showProfil = (userId) => {
        navigate(`/profile/${userId}`);
    }

    const sortedComments = [...tweet.comments].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <Fragment>
            <div className="mt-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg max-h-40 overflow-y-auto">
                <div className='flex'>
                    <h1 className='text-white'>Commentaires : </h1>
                    <Button color="success" onClick={handleClickOpen}><IoAddOutline className="w-5 h-5" /></Button>
                </div>

                {sortedComments.length > 0 ? (
                    sortedComments.map((commentaire, index) => (
                        <div key={index} className="p-2 border-b border-gray-300 dark:border-gray-600 flex justify-between items-center">
                            <div className="flex-1">
                                <p className="text-black dark:text-white text-sm">
                                    <Button onClick={() => showProfil(commentaire.userId)}> {/* Ajout de la fonction avec l'ID utilisateur */}
                                        {commentUsers[commentaire.userId] || 'Chargement...'}
                                    </Button>
                                </p>
                                <p className="text-black dark:text-white text-sm">{commentaire.content}</p>
                            </div>
                            {commentaire.userId === userIdSlice && (
                                <button onClick={() => handleDelete(commentaire.id)} className="text-red-500 hover:text-red-700">
                                    <FaTrash size={20} />
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Aucun commentaire pour l'instant.</p>
                )}
            </div>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth sx={{ '& .MuiDialog-paper': { backgroundColor: 'black', color: 'white' } }}>
                <div className="p-4">
                    <h1 className='text-white'>Tweet de : {userName}</h1>
                    <div className="flex">
                        <CgProfile className="w-10 h-10 text-gray-400 dark:text-white cursor-pointer" />
                        <div className="ml-2 flex-1">
                            <Typography variant="h6" gutterBottom>
                                {tweet.content}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex mt-5">
                        <CgProfile className="w-10 h-10 text-gray-400 dark:text-white cursor-pointer" />
                        <div className="ml-2 flex-1">
                            <TextField
                                autoFocus
                                margin="dense"
                                id="comment"
                                label="Votre réponse"
                                type="text"
                                fullWidth
                                multiline
                                rows={4}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                variant="outlined"
                                sx={{ backgroundColor: 'gray.800', '& .MuiInputBase-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'white' } }}
                            />
                        </div>
                    </div>
                </div>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleAddComment} color="primary">
                        Répondre
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default Commentaires;
