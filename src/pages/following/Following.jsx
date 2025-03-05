import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getName } from '../../domains/user/user';
import { CgProfile } from 'react-icons/cg';
import Loading from '../../shared/components/Loading';
import NavBar from '../../shared/components/Navbar';
import { showToastError } from '../../shared/utils/Toast';
import { fecthFollowersApi } from '../../domains/follow/follow';

const Following = () => {
    const { userId } = useParams();
    const token = useSelector((state) => state.auth.token);
    const userIdSlice = useSelector((state) => state.auth.userId);
    const [following, setFollowing] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId !== userIdSlice) {
            navigate('/profile/' + userId);
            return;
        }

        const fetchFollowing = async () => {
            try {
                const response = await fecthFollowersApi(token, userId);

                if (response.data) {
                    const followingWithInfo = await Promise.all(
                        response.data.map(async (follow) => {
                            try {
                                const userInfo = await getName(follow.followedId, token);
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
                    setFollowing(followingWithInfo);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des abonnements:', error);
                showToastError("Erreur lors de la récupération des abonnements");
            } finally {
                setIsLoading(false);
            }
        };

        fetchFollowing();
    }, [userId, token, userIdSlice, navigate]);

    const handleProfileClick = (followedId) => {
        navigate(`/profile/${followedId}`);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Fragment>
            <div className="min-h-screen bg-black">
                <NavBar />
                <div className="p-4 sm:ml-64">
                    <h1 className="text-white text-2xl font-bold mb-4">Abonnements</h1>
                    <div className="space-y-4">
                        {following.length > 0 ? (
                            following.map((follow) => (
                                <div 
                                    key={follow.id}
                                    className="bg-gray-800 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700"
                                    onClick={() => handleProfileClick(follow.followedId)}
                                >
                                    <div className="flex items-center">
                                        <CgProfile className="w-10 h-10 text-white mr-4" />
                                        <span className="text-white">{follow.email}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-white text-center">Aucun abonnement</p>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Following; 