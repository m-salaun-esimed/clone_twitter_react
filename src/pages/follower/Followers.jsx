import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getName } from '../../domains/user/user';
import { CgProfile } from 'react-icons/cg';
import Loading from '../../shared/components/Loading';
import NavBar from '../../shared/components/Navbar';
import { showToastError } from '../../shared/utils/Toast';
import axios from 'axios';

const Followers = () => {
    const { userId } = useParams();
    const token = useSelector((state) => state.auth.token);
    const userIdSlice = useSelector((state) => state.auth.userId);
    const [followers, setFollowers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId !== userIdSlice) {
            navigate('/profile/' + userId);
            return;
        }

        const fetchFollowers = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: `http://localhost:3000/Follows?followedId=${userId}`,
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data) {
                    const followersWithInfo = await Promise.all(
                        response.data.map(async (follow) => {
                            try {
                                const userInfo = await getName(follow.followerId, token);
                                return {
                                    ...follow,
                                    email: userInfo.email
                                };
                            } catch (error) {
                                console.error('Erreur lors de la récupération des infos utilisateur:', error);
                                return {
                                    ...follow,
                                    email: 'Utilisateur inconnu'
                                };
                            }
                        })
                    );
                    setFollowers(followersWithInfo);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des followers:', error);
                showToastError("Erreur lors de la récupération des followers");
            } finally {
                setIsLoading(false);
            }
        };

        fetchFollowers();
    }, [userId, token, userIdSlice, navigate]);

    const handleProfileClick = (followerId) => {
        navigate(`/profile/${followerId}`);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Fragment>
            <div className="min-h-screen bg-black">
                <NavBar />
                <div className="p-4 sm:ml-64">
                    <h1 className="text-white text-2xl font-bold mb-4">Abonnés</h1>
                    <div className="space-y-4">
                        {followers.length > 0 ? (
                            followers.map((follower) => (
                                <div 
                                    key={follower.id}
                                    className="bg-gray-800 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700"
                                    onClick={() => handleProfileClick(follower.followerId)}
                                >
                                    <div className="flex items-center">
                                        <CgProfile className="w-10 h-10 text-white mr-4" />
                                        <span className="text-white">{follower.email}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-white text-center">Aucun follower</p>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Followers; 