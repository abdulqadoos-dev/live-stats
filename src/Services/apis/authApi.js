import api from "./api";

export const signup = data => {
   return api.post('/signup', data)
}