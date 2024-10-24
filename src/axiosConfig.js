import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
});

// Aggiungi l'interceptor per includere automaticamente il token JWT nelle richieste
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Token presente:", token); // Aggiungi questo log per verificare il token
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
