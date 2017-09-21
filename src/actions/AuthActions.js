// Action Creator
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  GOOGLE_LOGIN,
  GOOGLE_LOGIN_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
} from './types';

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};
const signUpUserFail = (dispatch, errorMessage) => {
  console.log('signUpUserFail!: ', errorMessage);
  dispatch({ type: SIGNUP_USER_FAIL, payload: errorMessage });
};

const signUpUserSuccess = (dispatch, user) => {
  dispatch({
    type: SIGNUP_USER_SUCCESS,
    payload: user,
  });
};

// dispatch helper function
const loginUserSuccess = (dispatch, user) => {
  console.log('users', user.uid);
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  });
  // RouterComponent -> Scen key ="List"
  Actions.main();
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED, // action creator,  always have type property
    payload: text,
  };
};
export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text,
  };
};

export const loginUser = ({ email, password }) => {
  // ReduxThunk connection : use dispatch, return a function
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
      // user logged in, then runs
      // manually dispatch ourself
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch))
      .catch((error) => { // firebase gotcha
        console.log(error);
      });
  };
};
export const signUpUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_USER });
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => signUpUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error);
        const errorMessage = error.message;
        return signUpUserFail(dispatch, errorMessage);
      });
      // .then(user => loginUserSuccess(dispatch, user));
      // .catch(() => loginUserFail(dispatch));
  };
};
export const googleLogin = () => {
  return (dispatch) => {
    dispatch({ type: GOOGLE_LOGIN });

    // ...
  };
};
