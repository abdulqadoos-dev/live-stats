import { SIGNUP_FAILD, SIGNUP_START, SIGNUP_SUCCESS } from "../constants/authConstants";

import * as authApi from '../../Services/Apis/authApi';
import { VALIDATION_FAILD_CODE } from "../constants/Constans";

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
            console.log(formData, SIGNUP_SUCCESS);
         })
         .catch((error) => {
            error.status === VALIDATION_FAILD_CODE && error.validationResult ?
               dispatch(signupValidationFaild(error.validationResult.shift())) : dispatch(signupFaild(error))
            console.log(formData, SIGNUP_FAILD)
            // dispatch(signupFaild(error));
         });

      return promise;
   }
}


