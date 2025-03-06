import api from '../axiosInstance';

const addNotificationFollow = async (userIdfollower, userIdfollowed) => {
    console.log("userIdfollower, userIdfollowed : ", userIdfollower, userIdfollowed)
    try {
        const response = await api.post('notifications', {
            followerId: userIdfollower,
            followedId: userIdfollowed,
            notificationDate: new Date().toISOString(),
            isUnfollow: false,
            status: "abonnement"
        });

        console.log("Follow notification request sent:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la notification de demande de follow :", error.response?.data || error.message);
        throw error;
    }
}

const addNotificationLike = async (tweetId, userLikeId) => {
    try {
        const response = await api.post('notificationsLike', {
            tweetId: tweetId,
            userLikeId: userLikeId,
            notificationDate: new Date().toISOString()
        });

        console.log("Follow notification request sent:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la notification de demande de follow :", error.response?.data || error.message);
        throw error;
    }
}

const patchNotificationFollow = async (userIdfollower, userIdfollowed) => {
    try {
        const notifications = await api.get('notifications', {
            params: {
                followerId: userIdfollower,
                followedId: userIdfollowed
            }
        });

        if (notifications.data && notifications.data.length > 0) {
            const notificationId = notifications.data[0].id;
            const response = await api.patch(`notifications/${notificationId}`, {
                followerId: userIdfollower,
                followedId: userIdfollowed,
                notificationDate: new Date().toISOString(),
                isUnfollow: true
            });

            console.log("Follow notification updated:", response.data);
            return response.data;
        } else {
            console.error("Aucune notification trouvée pour ces IDs de suivi.");
            throw new Error("Aucune notification trouvée.");
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la notification de follow :", error.response?.data || error.message);
        throw error;
    }
}


const getRecentNotificationByUser = async (userId) => {
    try {
        console.log("userID dans getRecentNotificationByUser :", userId)
        const response = await api.get(`notifications/?followedId=${userId}&_sort=notificationDate&_order=desc`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récuperation des tweets :', error.response?.data || error.message);
        throw error;
    }
};

const getNotificationLike = async (userId) => {
    try {
        const response = await api.get(`tweets?userId=${userId}&_embed=notificationsLike`);
        console.log("response.data.notificationsLike dans getNotificationLike :", response.data);

        const tweetsWithLikes = response.data.filter(tweet => tweet.notificationsLike && tweet.notificationsLike.length > 0);

        console.log("Tweets avec notificationsLike :", tweetsWithLikes);
        return tweetsWithLikes;
    } catch (error) {
        console.error('Erreur lors de la récupération des tweets :', error.response?.data || error.message);
        throw error;
    }
}



export { addNotificationFollow, addNotificationLike, patchNotificationFollow, getRecentNotificationByUser, getNotificationLike};
