import { EMAIL_VERIFICATION_VIEW, SIGNUP_FAILD, SIGNUP_START, SIGNUP_SUCCESS, VERIFY_EMAIL, SET_VIEW, DEFAULT_VIEW, VERIFICATION_START, VERIFICATION_SUCCESS, VERIFICATION_FAILD } from "../constants/authConstants";

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



export const verificationRequest = (formData) => {
   return (dispatch) => {

      // console.log(formData, "hre...")
      dispatch(signupStart());

      const promise = authApi.verifyOtp(formData);

      promise
         .then((result) => {
            // dispatch(verificationSuccess());
            // dispatch(setView(DEFAULT_VIEW));
            console.log(result);
         })
         .catch((error) => {
            dispatch(verificationFaild())
            console.log(error)
         });

      return promise;
   }
}


