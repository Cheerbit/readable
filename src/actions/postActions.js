import uuid from 'uuid/v4';
import { HOST, URL_OPTIONS } from '../constants';

export const FETCH_ALL_POSTS_START = 'FETCH_ALL_POSTS_START';
export const FETCH_ALL_POSTS_SUCCESS = 'FETCH_ALL_POSTS_SUCCESS';
export const FETCH_ALL_POSTS_ERROR = 'FETCH_ALL_POSTS_ERROR';

export const FETCH_ALL_POSTS_BY_CATEGORY_START = 'FETCH_ALL_POSTS_BY_CATEGORY_START';
export const FETCH_ALL_POSTS_BY_CATEGORY_SUCCESS = 'FETCH_ALL_POSTS_BY_CATEGORY_SUCCESS';
export const FETCH_ALL_POSTS_BY_CATEGORY_ERROR = 'FETCH_ALL_POSTS_BY_CATEGORY_ERROR';

export const FETCH_SINGLE_POST_START = 'FETCH_SINGLE_POST_START';
export const FETCH_SINGLE_POST_SUCCESS = 'FETCH_SINGLE_POST_SUCCESS';
export const FETCH_SINGLE_POST_ERROR = 'FETCH_SINGLE_POST_ERROR';

export const VOTE_POST_START = 'VOTE_POST_START';
export const VOTE_POST_SUCCESS = 'VOTE_POST_SUCCESS';
export const VOTE_POST_ERROR = 'VOTE_POST_ERROR';

export const DELETE_POST_START = 'DELETE_POST_START';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR';

export const ADD_POST_START = 'ADD_POST_START';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_ERROR = 'ADD_POST_ERROR';

export const EDIT_POST_START = 'EDIT_POST_START';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_ERROR = 'EDIT_POST_ERROR';

export const fetchAllPosts = () => dispatch => {
  dispatch({ type: FETCH_ALL_POSTS_START });
  return fetch(`${HOST}/posts`, URL_OPTIONS)
    .then(response => response.json())
    .then(json => dispatch({ type: FETCH_ALL_POSTS_SUCCESS, data: json }))
    .catch(error => dispatch({ type: FETCH_ALL_POSTS_ERROR, data: error }));
};

export const fetchPostsByCategory = category => dispatch => {
  dispatch({ type: FETCH_ALL_POSTS_BY_CATEGORY_START });
  return fetch(`${HOST}/${category}/posts`, URL_OPTIONS)
    .then(response => response.json())
    .then(json => dispatch({ type: FETCH_ALL_POSTS_BY_CATEGORY_SUCCESS, data: json }))
    .catch(error => dispatch({ type: FETCH_ALL_POSTS_BY_CATEGORY_ERROR, data: error }));
};

export const fetchSinglePost = post_id => dispatch => {
  dispatch({ type: FETCH_SINGLE_POST_START });
  return fetch(`${HOST}/posts/${post_id}`, URL_OPTIONS)
    .then(response => response.json())
    .then(json => dispatch({ type: FETCH_SINGLE_POST_SUCCESS, data: json }))
    .catch(error => dispatch({ type: FETCH_SINGLE_POST_ERROR, data: error }));
};

export const votePost = (postId, vote) => dispatch => {
  dispatch({ type: VOTE_POST_START });
  const payload = { option: vote };
  return fetch(`${HOST}/posts/${postId}`, {
    ...URL_OPTIONS,
    body: JSON.stringify(payload),
    cache: 'no-cache',
    method: 'POST',
  })
    .then(response => response.json())
    .then(json => dispatch({ type: VOTE_POST_SUCCESS, data: json }))
    .catch(error => dispatch({ type: VOTE_POST_ERROR, data: error }));
};

export const deletePost = postId => dispatch => {
  dispatch({ type: DELETE_POST_START });
  return fetch(`${HOST}/posts/${postId}`, {
    ...URL_OPTIONS,
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(json => dispatch({ type: DELETE_POST_SUCCESS, data: json }))
    .catch(error => dispatch({ type: DELETE_POST_ERROR, data: error }));
};

export const addPost = ({ author, body, title, category }) => dispatch => {
  dispatch({ type: ADD_POST_START });
  const payload = {
    id: uuid(),
    author,
    body,
    category,
    timestamp: Date.now(),
  };

  return fetch(`${HOST}/posts`, {
    ...URL_OPTIONS,
    body: JSON.stringify(payload),
    cache: 'no-cache',
    method: 'POST',
  })
    .then(response => response.json())
    .then(json => dispatch({ type: ADD_POST_SUCCESS, data: json }))
    .catch(error => dispatch({ type: ADD_POST_ERROR, data: error }));
};

export const editPost = ({ postId, body, title }) => dispatch => {
  dispatch({ type: EDIT_POST_START });
  const payload = {
    timestamp: Date.now(),
    body,
    title,
  };

  return fetch(`${HOST}/posts/${postId}`, {
    ...URL_OPTIONS,
    body: JSON.stringify(payload),
    cache: 'no-cache',
    method: 'PUT',
  })
    .then(response => response.json())
    .then(json => dispatch({ type: EDIT_POST_SUCCESS, data: json }))
    .catch(error => dispatch({ type: EDIT_POST_ERROR, data: error }));
};
