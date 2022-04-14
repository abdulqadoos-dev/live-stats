import {
   OTP_VERIFICATION_VIEW, SIGNUP_FAILD,
   SIGNUP_SUCCESS, SET_VIEW, DEFAULT_VIEW,
   VERIFICATION_SUCCESS, VERIFICATION_FAILD,
   REQUEST_START,
   LOGIN_SUCCESS, LOGIN_FAILD,
   FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_FAILD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILD
} from "../constants/authConstants";

import * as authApi from '../../Services/Apis/authApi';
import { BASE_PATH, LOGIN_PATH, STATUS_CODE_400, VALIDATION_FAILD_CODE } from "../constants/Constans";



export const setView = (view) => {
   return {
      type: SET_VIEW,
      view
   }
}


export const requestStart = () => {
   return {
      type: REQUEST_START
   }
}

export const signupSuccess = (result) => {
   return {
      type: SIGNUP_SUCCESS,
      result
   }
}

export const signupFaild = (error) => {
   return {
      type: SIGNUP_FAILD,
      error
   }
}


export const signupRequest = (formData) => {

   return (dispatch) => {

      dispatch(requestStart());


      const promise = authApi.signup(formData);

      promise
         .then((result) => {
            dispatch(signupSuccess(result.data.data));
            dispatch(setView(OTP_VERIFICATION_VIEW));
            console.log(result.data.data, SIGNUP_SUCCESS);
         })
         .catch((error) => {
            error.status === VALIDATION_FAILD_CODE && error.validationResult ?
               dispatch(signupValidationFaild(error.validationResult.shift())) : dispatch(signupFaild(error))
            console.log(formData, SIGNUP_FAILD)
         });

      return promise;
   }
}





export const verificationSuccess = (response) => {
   return {
      type: VERIFICATION_SUCCESS,
      ...response
   }
}

export const verificationFaild = () => {
   return {
      type: VERIFICATION_FAILD
   }
}

export const signupValidationFaild = (validationResult) => {
   return {
      type: SIGNUP_FAILD,
      validationResult
   }
}



export const verificationRequest = (formData, navigate = null, activeView = DEFAULT_VIEW) => {
   return (dispatch) => {

      dispatch(requestStart());


      const promise = authApi.verifyOtp(formData);

      promise
         .then((result) => {
            dispatch(verificationSuccess(result.data.data));
            dispatch(setView(activeView));
            navigate && navigate(BASE_PATH);
         })
         .catch((error) => {
            dispatch(verificationFaild())
         });

      return promise;
   }
}




export const loginSuccess = (result) => {
   return {
      type: LOGIN_SUCCESS,
      result
   }
}

export const loginFaild = (error) => {
   return {
      type: LOGIN_FAILD,
      ...error
   }
}


export const loginRequest = (formData, navigate) => {
   return (dispatch) => {

      dispatch(requestStart());

      const promise = authApi.login(formData);

      promise
         .then((result) => {
            dispatch(loginSuccess(result.data.data));
            navigate(BASE_PATH);
            console.log(result.data.data, LOGIN_SUCCESS);
         })
         .catch((error) => {
            error.status === STATUS_CODE_400 ? dispatch(loginFaild(error.data)) : dispatch(loginFaild({error : "Invalid credintials"}));
            console.log(formData, error, LOGIN_FAILD)
         });

      return promise;
   }
}



export const forgetPasswordSuccess = (result) => {
   return {
      type: FORGET_PASSWORD_SUCCESS,
      result
   }
}

export const forgetPasswordFaild = (error) => {
   return {
      type: FORGET_PASSWORD_FAILD,
      error
   }
}



export const forgetPasswordRequest = (formData) => {
   return (dispatch) => {

      dispatch(requestStart());

      const promise = authApi.forgetPassword(formData);

      promise
         .then((result) => {
            dispatch(forgetPasswordSuccess(result.data.data));
            dispatch(setView(OTP_VERIFICATION_VIEW));
            console.log(result.data.data, FORGET_PASSWORD_SUCCESS);
         })
         .catch((error) => {
            dispatch(forgetPasswordFaild({ validationResult: error.message }))
            console.log({ formData }, error.message, FORGET_PASSWORD_FAILD)
         });

      return promise;
   }
}





export const changePasswordSuccess = (result) => {
   return {
      type: CHANGE_PASSWORD_SUCCESS,
      result
   }
}

export const changePasswordFaild = (error) => {
   return {
      type: CHANGE_PASSWORD_FAILD,
      error
   }
}


export const changePasswordRequest = (formData,navigate) => {
   return (dispatch) => {

      dispatch(requestStart());

      const promise = authApi.resetPassword(formData);

      promise
         .then((result) => {
            dispatch(changePasswordSuccess(result.data.data));
            console.log(result.data.data, CHANGE_PASSWORD_SUCCESS);
            navigate(LOGIN_PATH)
         })
         .catch((error) => {
            dispatch(changePasswordFaild({ validationResult: error.message }))
            console.log({ formData }, error.message, CHANGE_PASSWORD_FAILD)
         });

      return promise;
   }
}