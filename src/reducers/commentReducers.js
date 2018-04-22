import _ from 'lodash';
import {
  FETCH_ALL_COMMENTS_START, FETCH_ALL_COMMENTS_SUCCESS, FETCH_ALL_COMMENTS_ERROR,
  VOTE_COMMENT_SUCCESS, DELETE_COMMENT_SUCCESS, ADD_COMMENT_SUCCESS,
  EDIT_COMMENT_SUCCESS,
} from '../actions/commentActions'

export const normalized = (state = {}, payload) => {
  switch (payload.type) {
    case FETCH_ALL_COMMENTS_SUCCESS:
      return {
        ..._.keyBy(payload.data, 'id'),
      };
    case VOTE_COMMENT_SUCCESS:
    case DELETE_COMMENT_SUCCESS:
    case ADD_COMMENT_SUCCESS:
    case EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        [payload.data.id]: payload.data,
      }
    default:
      return state;
  }
};

export const isFetchingAll = (state = false, payload) => {
  switch (payload.type) {
    case FETCH_ALL_COMMENTS_SUCCESS:
    case FETCH_ALL_COMMENTS_ERROR:
      return false;
    case FETCH_ALL_COMMENTS_START:
      return true;
    default:
      return state;
  }
};
