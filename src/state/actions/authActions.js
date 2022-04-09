import { EMAIL_VERIFICATION_VIEW, SIGNUP_FAILD, SIGNUP_START, SIGNUP_SUCCESS, VERIFY_EMAIL, SET_VIEW, DEFAULT_VIEW, VERIFICATION_START, VERIFICATION_SUCCESS, VERIFICATION_FAILD, LOGIN_SUCCESS, LOGIN_FAILD, LOGIN_START } from "../constants/authConstants";

import * as authApi from '../../Services/Apis/authApi';
import { VALIDATION_FAILD_CODE } from "../constants/Constans";

export const setView = (view) => {
   return {
      type: SET_VIEW,
      view
   }
}

export const signupStart = () => {
   return {
      type: SIGNUP_START
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

      dispatch(signupStart());

      const promise = authApi.signup(formData);

      promise
         .then((result) => {
            dispatch(signupSuccess(result.data.data));
            dispatch(setView(EMAIL_VERIFICATION_VIEW));
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



export const verificationStart = () => {
   return {
      type: VERIFICATION_START
   }
}

export const verificationSuccess = () => {
   return {
      type: VERIFICATION_SUCCESS
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



export const verificationRequest = (formData) => {
   return (dispatch) => {

      dispatch(signupStart());

      const promise = authApi.verifyOtp(formData);

      promise
         .then((result) => {
            dispatch(verificationSuccess());
            dispatch(setView(DEFAULT_VIEW));
            console.log(result);
         })
         .catch((error) => {
            dispatch(verificationFaild())
            console.log(error)
         });

      return promise;
   }
}



export const loginStart = () => {
   return {
      type: LOGIN_START
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
      error
   }
}


export const loginRequest = (formData) => {
   return (dispatch) => {

      dispatch(loginStart());

      const promise = authApi.login(formData);

      promise
         .then((result) => {
            dispatch(loginSuccess(result.data.data));
            console.log(result.data.data, LOGIN_SUCCESS);
         })
         .catch((error) => {
            dispatch(loginFaild(error))
            console.log(formData,error, LOGIN_FAILD)
         });

      return promise;
   }
}