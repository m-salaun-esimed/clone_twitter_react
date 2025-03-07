import api from '../axiosInstance';

const postComment = async (tweetId, content, userId) => {
    try {
        const response = await api.post('/comments', {
            tweetId,
            content,
            userId,
            date: new Date().toISOString()
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire :', error.response?.data || error.message);
        throw error;
    }
};

export { postComment };
