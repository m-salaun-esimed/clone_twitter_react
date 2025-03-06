import api from '../axiosInstance';

const getRecentTweets = async (token) => {
    try {
        const response = await api.get('tweet/?_sort=date&_order=desc', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récuperation des tweets :', error.response?.data || error.message);
        throw error;
    }
};

const getTopLikedTweets = async (token) => {
    try {
        const response = await api.get('tweet/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récuperation des tweets :', error.response?.data || error.message);
        throw error;
    }
};

const getTweetsFollowByOrderDesc = async (token, followsId) => {
    try {
        if (followsId.length === 0) {
            return;
        }
        const queryParams = followsId.map(id => `userId=${id}`).join("&");

        const url = `tweet/?${queryParams}&_sort=date&_order=desc`;

        const response = await api.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des tweets :", error.response?.data || error.message);
        throw error;
    }
};


const postTweet = async (token, userId, content) => {
    const tweet = {
        "userId": userId,
        "content": content,
        "date": new Date().toISOString(),
        "likes": 0,
        "comments": 0
    };

    try {
        const response = await api.post('tweet/', tweet, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récuperation des tweets :', error.response?.data || error.message);
        throw error;
    }
};

const getTweetByUser = async (token, userId) => {
    try {
        const response = await api.get(`tweet/?userId=${userId}&_sort=date&_order=desc`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récuperation des tweets :', error.response?.data || error.message);
        throw error;
    }
};

const getTopLikedTweetsByUser = async (token, userId) => {
    try {
        const response = await api.get(`tweet/?userId=${userId}&_sort=likes&_order=desc`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récuperation des tweets :', error.response?.data || error.message);
        throw error;
    }
};

const deleteTweet = async (token, tweetId) => {
    try {
        const response = await api.delete(`tweet/${tweetId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression du tweet :', error.response?.data || error.message);
        throw error;
    }
};

const editTweetUser = async (token, tweetId, newContent) => {
    try {
        const response = await api.patch(`tweet/${tweetId}`, {
            content: newContent,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la modification du tweet :', error.response?.data || error.message);
        throw error;
    }
};

export { getRecentTweets, postTweet, getTopLikedTweets, getTweetByUser, getTopLikedTweetsByUser, getTweetsFollowByOrderDesc, deleteTweet, editTweetUser };
