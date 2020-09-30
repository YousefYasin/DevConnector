import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "./../utils/setAuthToken";
import jwt_decode from "jwt-decode";
//REGISTER USER
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login Get user token

export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      //save to local storage
      const { token } = res.data;
      //set token to local storage
      localStorage.setItem("jwtToken", token);
      // Set token to the headers
      setAuthToken(token);
      //Decode token to get user data
      const decode = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decode));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
//set logged user
export const setCurrentUser = (decode) => {
  return {
    type: SET_CURRENT_USER,
    payload: decode,
  };
};

// log user out
export const logoutUser = () => (dispatch) => {
  // Remive token from localStorage
  localStorage.removeItem("jwtToken");
  //Remove outh header for future requests

  setAuthToken(false);
  //Set the current user to {} which will set the Auth to false
  dispatch(setCurrentUser({}))
};
