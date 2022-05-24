import api from "./api";

export const signup = data => {
   return api.post('/signup', data)
}

export const login = data => {
   return api.post('/login', data)
}

export const verifyOtp = data => {
   return api.post('/verify-otp', data)
}

export const forgetPassword = data => {
   return api.post('/forget-password', data)
}

export const resetPassword = data => {
   return api.post('/reset-password', data)
}

export const uploadUserImage = formData => {
   return api.post('/user/upload-image', formData)
}