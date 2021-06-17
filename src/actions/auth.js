//actions for authenticating the user

import APIUrls from '../helpers/urls';
import { getFormBody } from '../helpers/utils';
import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS } from './actionTypes';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}
export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    //Encoded format content type
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        if (data.succes) {
          //save the user option - dispatch save action
          dispatch(loginSuccess(data.data.user));
        } else {
          //failed action
          dispatch(loginFailed(data.message));
        }
      });
  };
}
