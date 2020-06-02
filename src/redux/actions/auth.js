import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = (authData, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBocpT4UTOvMtflk3PhCCAPi7DAA5oMz6E";

    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBocpT4UTOvMtflk3PhCCAPi7DAA5oMz6E";
    }
    axios
      .post(url, authData)
      .then((response) => {
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch((err) => dispatch(authFail(err.response.data.error)));
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
    }
  };
};
