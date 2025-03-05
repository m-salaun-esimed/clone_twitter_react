import axios from 'axios';

const dbUrl = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 5000,
});

const likeTweet = async (tweetId, userId, token) => {
    const isLike = await checkIfLiked(tweetId, userId, token); 
    if(isLike){
        return;
    }
    else{
        try {
            const response = await axios.post(
                'http://localhost:3000/likes',
                {
                    tweetId,
                    userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Tweet liked:', response.data);
        } catch (error) {
            console.error('Erreur lors du like du tweet:', error.response?.data || error.message);
        }
    }
};

const deleteLikeTweet = async (tweetId, userId, token) => {
    const likeId = await getLikeId(tweetId, userId, token);
    console.log("likedId : ", likeId);
    const isLike = await checkIfLiked(tweetId, userId, token);
    if(isLike){
        try {
            const response = await axios.delete(
                `http://localhost:3000/likes/${likeId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Like supprimé:', response.data);
        } catch (error) {
            console.error('Erreur lors de la suppression du like du tweet:', error.response?.data || error.message);
        }
    }
    else{
        return;
    }
};

const checkIfLiked = async (tweetId, userId, token) => {
    try {
        const response = await axios.get(`http://localhost:3000/likes?tweetId=${tweetId}&userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.length > 0;
    } catch (error) {
        console.error('Erreur lors de la vérification du like:', error.response?.data || error.message);
        return false; 
    }
};

const getLikeId = async (tweetId, userId, token) => {
    try {
        const response = await axios.get(`http://localhost:3000/likes?tweetId=${tweetId}&userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("response.data : ", response.data);

        if (response.data && response.data.length > 0) {
            return response.data[0].id; 
        }

        return null;
    } catch (error) {
        console.error('Erreur lors de la vérification du like:', error.response?.data || error.message);
        return false; 
    }
};

const getNbrLike = async (tweetId, token) => {
    try {
        const response = await axios.get(`http://localhost:3000/likes`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const likesForTweet = response.data.filter(like => like.tweetId === tweetId);
        console.log("likesForTweet : ",likesForTweet, " tweetId : ", tweetId);
        return likesForTweet.length;
    } catch (error) {
        console.error('Erreur lors de la récupération du nombre de likes:', error.response?.data || error.message);
        return 0;
    }
};


export { checkIfLiked, likeTweet, deleteLikeTweet, getLikeId, getNbrLike };
