//actions for authenticating the user

import APIUrls from '../helpers/urls';
import { getFormBody } from '../helpers/utils';
import { LOGIN_START } from './actionTypes';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function login(email, password) {
  return (dispatch) => {
    const url = APIUrls.login();
    //Encoded format content type
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    }).then();
  };
}
