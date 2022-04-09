import api from "./api";

export const signup = data => {
   return api.post('/signup', data)
}

export const verifyOtp = data => {
   return api.post('/verify-otp', data)
}