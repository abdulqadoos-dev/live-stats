import api from "./api";
import { REQUEST_FAILD, REQUEST_SUCCESS, SIGNUP_PATH } from "../Constans";

export const signup = data => {
   return api.post('/signup', data)
}