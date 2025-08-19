import axios from "axios";
import { logout } from "../Redux/slice/authSlice";
import { baseUrl } from '../utils/baseUrl';
import store from "../Redux/store/store";
import { handleLogout } from "../utils/handleLogout";
const api = axios.create({
    baseURL: baseUrl,
});

api.interceptors.request.use(
    (config) => {
        const { token } = store.getState().auth;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;;
        }
        return config;
    },
    (error) => {
        throw error;
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log("request error", error)

        if (error.response && error.response.status === 401) {
            store.dispatch(logout());
            handleLogout(); 
        }
        throw error;
    }
);

export default api;
 