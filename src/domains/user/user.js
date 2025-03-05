import axios from 'axios';

const dbUrl = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 5000,
});

const getName = async (userId, token) => {
    try {
        const response = await dbUrl.get(`users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération du nom :', error.response?.data || error.message);
        throw error;
    }
};

const checkTokenValidity = async (token, userId) => {
    try {
        const response = await dbUrl.get(`600/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return true;
    } catch (error) {
        if (error.response?.status === 401) {
            console.error("❌ Token invalide ou expiré.");
            return false;
        }

        console.error("❌ Erreur lors de la vérification du token :", error.response?.data || error.message);
        return false;
    }
};




export { getName, checkTokenValidity};
