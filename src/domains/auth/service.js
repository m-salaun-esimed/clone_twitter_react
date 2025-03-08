import api from "../axiosInstance";


const loginApi = async (email, password) => {
        const response = await api.post('login', { email, password });
        return response.data;
};

const registerApi = async (email, password) => {
        const encodedEmail = encodeURIComponent(email);
        const existingUsers = await api.get(`users?email=${encodedEmail}`);

        if (existingUsers.data.length > 0) {
            throw new Error("Cet email est déjà utilisé.");
        }
        const date = new Date().toISOString();
        const response = await api.post('users', { email, password, date });
        return response.data;
};

const checkTokenValidity = async (token, userId) => {
    try {
        const response = await api.get(`600/users/${userId}`, {
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



export { loginApi, registerApi, checkTokenValidity};