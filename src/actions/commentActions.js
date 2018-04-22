import uuid from 'uuid/v4';
import { HOST, URL_OPTIONS } from '../constants';
export const FETCH_ALL_COMMENTS_START = 'FETCH_ALL_COMMENTS_START';
export const FETCH_ALL_COMMENTS_SUCCESS = 'FETCH_ALL_COMMENTS_SUCCESS';
export const FETCH_ALL_COMMENTS_ERROR = 'FETCH_ALL_COMMENTS_ERROR';

export const VOTE_COMMENT_START = 'VOTE_COMMENT_START';
export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS';
export const VOTE_COMMENT_ERROR = 'VOTE_COMMENT_ERROR';

export const DELETE_COMMENT_START = 'DELETE_COMMENT_START';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';

export const ADD_COMMENT_START = 'ADD_COMMENT_START';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR';

export const EDIT_COMMENT_START = 'EDIT_COMMENT_START';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_ERROR = 'EDIT_COMMENT_ERROR';

export const fetchAllComments = postId => dispatch => {
  dispatch({ type: FETCH_ALL_COMMENTS_START });
  return fetch(`${HOST}/posts/${postId}/comments`, URL_OPTIONS)
    .then(response => response.json())
    .then(json => dispatch({ type: FETCH_ALL_COMMENTS_SUCCESS, data: json }))
    .catch(error => dispatch({ type: FETCH_ALL_COMMENTS_ERROR, data: error }));
};

export const voteComment = (commentId, vote) => dispatch => {
  dispatch({ type: VOTE_COMMENT_START });
  const payload = { option: vote };
  return fetch(`${HOST}/comments/${commentId}`, {
    ...URL_OPTIONS,
    body: JSON.stringify(payload),
    cache: 'no-cache',
    method: 'POST',
  })
    .then(response => response.json())
    .then(json => dispatch({ type: VOTE_COMMENT_SUCCESS, data: json }))
    .catch(error => dispatch({ type: VOTE_COMMENT_ERROR, data: error }));
};

export const deleteComment = commentId => dispatch => {
  dispatch({ type: DELETE_COMMENT_START });
  return fetch(`${HOST}/comments/${commentId}`, {
    ...URL_OPTIONS,
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(json => dispatch({ type: DELETE_COMMENT_SUCCESS, data: json }))
    .catch(error => dispatch({ type: DELETE_COMMENT_ERROR, data: error }));
};

export const addComment = ({ postId, author, body }) => dispatch => {
  dispatch({ type: ADD_COMMENT_START });
  const payload = {
    id: uuid(),
    author,
    body,
    timestamp: Date.now(),
    parentId: postId,
  };

  return fetch(`${HOST}/comments`, {
    ...URL_OPTIONS,
    body: JSON.stringify(payload),
    cache: 'no-cache',
    method: 'POST',
  })
    .then(response => response.json())
    .then(json => dispatch({ type: ADD_COMMENT_SUCCESS, data: json }))
    .catch(error => dispatch({ type: ADD_COMMENT_ERROR, data: error }));
};

export const editComment = ({ commentId, body }) => dispatch => {
  dispatch({ type: EDIT_COMMENT_START });
  const payload = {
    timestamp: Date.now(),
    body,
  };

  return fetch(`${HOST}/comments/${commentId}`, {
    ...URL_OPTIONS,
    body: JSON.stringify(payload),
    cache: 'no-cache',
    method: 'PUT',
  })
    .then(response => response.json())
    .then(json => dispatch({ type: EDIT_COMMENT_SUCCESS, data: json }))
    .catch(error => dispatch({ type: EDIT_COMMENT_ERROR, data: error }));
};
