import api from "../axiosInstance";


const loginApi = async (email, password) => {
    try {
        const response = await api.post('login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la connexion :', error.response?.data || error.message);
        throw error;
    }
};

const registerApi = async (email, password) => {
    try {
        const encodedEmail = encodeURIComponent(email);
        const existingUsers = await api.get(`users?email=${encodedEmail}`);

        if (existingUsers.data.length > 0) {
            throw new Error("Cet email est déjà utilisé.");
        }
        const date = new Date().toISOString();
        const response = await api.post('users', { email, password, date });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error.response?.data || error.message);
        throw error;
    }
};



export { loginApi, registerApi };
