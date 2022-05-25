import axios from 'axios';
import {LOCAL_STORAGE_AUTH_USER, LOGOUT_PATH} from "../constants/Constans";

const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_PATH
})

api.interceptors.request.use((request) => {
    const authUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_USER));
    if (authUser && authUser.token) request.headers['Authorization'] = `Bearer ${authUser.token}`
    request.headers['Content-Type'] = `application/json`
    return request;
});

api.interceptors.response.use((response) => {

    if (response.status === 401) {
        window.localStorage.removeItem(LOCAL_STORAGE_AUTH_USER);
        window.location.replace(LOGOUT_PATH);
    }
    return response;
}, (error) => {
    if (error.status === 401) {
        window.localStorage.removeItem(LOCAL_STORAGE_AUTH_USER);
        window.location.replace(LOGOUT_PATH);
    }
    throw {...error.response};
});

export default api;