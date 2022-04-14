import axios from 'axios';

const api = axios.create({
   baseURL: process.env.REACT_APP_SERVER_PATH
})

api.interceptors.request.use((request) => {
   const token = localStorage.getItem('token')
   if (token) request.headers['Authorization'] = `Bearer${token}`
   request.headers['Content-Type'] = `application/json`
   return request;
});

api.interceptors.response.use((response) => {

   // if (response.status === 401) {
   //    // window.location.reload();
   // }
   return response;
}, (error) => {
   // if (error.response.status === 401) {
   //    // window.location.reload();
   // }
   throw { ...error.response };
});

export default api;