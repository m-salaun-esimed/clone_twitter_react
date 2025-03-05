import axios from 'axios';


const dbUrl = axios.create({
    baseURL: 'http://localhost:3000/tweet/',
    timeout: 5000,
});

const getRecentTweets = async (token) => {
    try {
        const response = await dbUrl.get('?_sort=date&_order=desc', {
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
        const response = await dbUrl.get('', {
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

        const url = `?${queryParams}&_sort=date&_order=desc`;

        const response = await dbUrl.get(url, {
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
        const response = await dbUrl.post('', tweet, {
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
        const response = await dbUrl.get(`?userId=${userId}&_sort=date&_order=desc`, {
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

const getTweetByUserAndLikeOrderByDesk = async (token, userId) => {
    try {
        const response = await dbUrl.get(`?userId=${userId}&_sort=likes&_order=desc`, {
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

export { getRecentTweets, postTweet, getTopLikedTweets, getTweetByUser, getTweetByUserAndLikeOrderByDesk, getTweetsFollowByOrderDesc };
