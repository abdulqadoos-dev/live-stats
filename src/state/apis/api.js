import axios from 'axios';
import {LOCAL_STORAGE_AUTH_USER, LOGIN_PATH} from "../constants/Constans";

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
    return response;
}, (error) => {
    if (error.response.status === 401) {
        window.localStorage.removeItem(LOCAL_STORAGE_AUTH_USER);
        window.location.replace(LOGIN_PATH);
    }
    throw {...error.response};
});

export default api;