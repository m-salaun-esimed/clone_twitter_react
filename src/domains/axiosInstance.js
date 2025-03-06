import axios from "axios";

const headers = localStorage.getItem("accessToken") ? {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
} : {}

const api = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 5000,
    headers
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("Token invalide ou expiré. Déconnexion...");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
