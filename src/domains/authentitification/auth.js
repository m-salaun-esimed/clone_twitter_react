import axios from 'axios';

const dbUrl = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 5000,
});

const loginApi = async (email, password) => {
    try {
        const response = await dbUrl.post('login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la connexion :', error.response?.data || error.message);
        throw error;
    }
};

const registerApi = async (email, password) => {
    try {
        const encodedEmail = encodeURIComponent(email);
        const existingUsers = await dbUrl.get(`users?email=${encodedEmail}`);

        if (existingUsers.data.length > 0) {
            throw new Error("Cet email est déjà utilisé.");
        }
        const date = new Date().toISOString();
        const response = await dbUrl.post('users', { email, password, date });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error.response?.data || error.message);
        throw error;
    }
};



export { loginApi, registerApi };
