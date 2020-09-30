import axios from "axios";

import {
  ADD_POST,
  DELETE_POST,
  GET_ERRORS,
  GET_POST,
  GET_POSTS,
  POST_LOADING,
  CLEAR_ERRORS
} from "./types";

//add Post

export const addPost = (postData) => (dispatch) => {
  dispatch(clearErrors())

  axios
    .post("/api/posts", postData)
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      // console.log(err,'fffffff')
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//get all posts

export const getPosts = () => (dispatch) => {
  dispatch(setPoatLoading());
  axios
    .get("/api/posts")
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      // console.log(err,'fffffff')
      dispatch({
        type: GET_POSTS,
        payload: null,
      })
    );
};

//get  post

export const getPost = (id) => (dispatch) => {
  dispatch(setPoatLoading());
  axios
    .get(`/api/posts/${id}`)
    .then((res) => {
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    })
    .catch((err) =>
      // console.log(err,'fffffff')
      dispatch({
        type: GET_POST,
        payload: null,
      })
    );
};

//Delete Post

export const deletePost = (id) => (dispatch) => {
  axios
    .delete(`/api/posts/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_POST,
        payload: id,
      })
    )
    .catch((err) =>
      //   console.log(err,'fffffff')
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Add Like

export const addLike = (id) => (dispatch) => {
  axios
    .post(`/api/posts/like/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      //   console.log(err,'fffffff')
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//remove Like

export const removeLike = (id) => (dispatch) => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      //   console.log(err,'fffffff')
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//add Comment

export const addComment = (postId, commentData) => (dispatch) => {
  dispatch(clearErrors())
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      // console.log(err,'fffffff')
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//delete Comment

export const deleteComment = (postId, commentId) => (dispatch) => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      // console.log(err,'fffffff')
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// Set Loading state
export const setPoatLoading = () => {
  return {
    type: POST_LOADING,
  };
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
