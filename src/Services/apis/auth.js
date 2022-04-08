
import { REQUEST_FAILD, REQUEST_SUCCESS, SIGNUP_PATH } from "../Constans";
import request from "./api";

export const signup = data => {
  request.post('/signup', data)
    .then(res => {
      console.log(res, REQUEST_SUCCESS)
    })
    .catch(err => {
      console.error(err, REQUEST_FAILD)
    })
}