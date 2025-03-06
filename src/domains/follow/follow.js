import api from '../axiosInstance';

const followApi = async (token, userIdfollower, userIdfollowed) => {
    try {
        const response = await api.post('follows', {
            followerId: userIdfollower,
            followedId: userIdfollowed,
            requestDate: new Date().toISOString(),
            acceptDate: null
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        console.log("Follow request sent:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la demande de follow :", error.response?.data || error.message);
        throw error;
    }
}

const counterFollowed = async (token, userId) => {
    try {
        const response = await api.get(`follows?followedId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.length;
    } catch (error) {
        console.error('Erreur lors de la récupération des données de suivi :', error.response?.data || error.message);
        throw error;
    }
};

const counterFollower = async (token, userId) => {
    try {
        const response = await api.get(`follows?followerId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.length;
    } catch (error) {
        console.error('Erreur lors de la récupération des données de suivi :', error.response?.data || error.message);
        throw error;
    }
};

const getFollowsIds = async (token, userId) => {
    try {
        const response = await api.get(`follows?followerId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("response.data : ", response.data.map(follow => follow.followedId));
        return  response.data.map(follow => follow.followedId);
    } catch (error) {
        console.error('Erreur lors de la récupération des données de suivi :', error.response?.data || error.message);
        throw error;
    }
};

const checkIfFollowApi = async (token, userIdfollower, userIdFollowed) => {
    try {
        const response = await api.get(`follows?followerId=${userIdfollower}&followedId=${userIdFollowed}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data.length > 0) {
            return true;
        }

        return false;
    } catch (error) {
        console.error('Erreur lors de la récupération des données de suivi :', error.response?.data || error.message);
        throw error;
    }
};

const unfollowApi = async (token, userIdfollower, userIdfollowed) => {
    try {
        const response = await api.get(`follows?followerId=${userIdfollower}&followedId=${userIdfollowed}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data.length === 0) {
            throw new Error('Relation de follow non trouvée');
        }

        const followId = response.data[0].id;

        const deleteResponse = await api.delete(`follows/${followId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Unfollow successful");
        return deleteResponse.data;
    } catch (error) {
        console.error("Erreur lors de l'unfollow :", error.response?.data || error.message);
        throw error;
    }
};

const fecthFollowersApi = async (token, userId) => {
    try {
        const response = await api.get(`Follows?followerId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log("response fecthFollowersApi :", response)
        return response;
    } catch (error) {
        console.error('Erreur lors de la récupération des followers:', error);
        throw error;
    }
}; 

const fetchFollowingApi = async (token, userId) => {
    try {
        const response = await api.get(`Follows?followedId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error('Erreur lors de la récupération des following:', error);
        throw error;
    }
};

export { counterFollower, counterFollowed, getFollowsIds, followApi, checkIfFollowApi, unfollowApi, fecthFollowersApi, fetchFollowingApi };
