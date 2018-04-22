import _ from 'lodash';
import {
  FETCH_ALL_POSTS_START, FETCH_ALL_POSTS_SUCCESS, FETCH_ALL_POSTS_ERROR,
  FETCH_SINGLE_POST_START, FETCH_SINGLE_POST_SUCCESS, FETCH_SINGLE_POST_ERROR,
  VOTE_POST_SUCCESS, DELETE_POST_SUCCESS, ADD_POST_SUCCESS, EDIT_POST_SUCCESS,
  FETCH_ALL_POSTS_BY_CATEGORY_SUCCESS,
} from '../actions/postActions'

export const normalized = (state = {}, payload) => {
  switch (payload.type) {
    case FETCH_ALL_POSTS_SUCCESS:
    case FETCH_ALL_POSTS_BY_CATEGORY_SUCCESS:
      return {
        ..._.keyBy(payload.data, 'id'),
      };
    case FETCH_SINGLE_POST_SUCCESS:
    case VOTE_POST_SUCCESS:
    case DELETE_POST_SUCCESS:
    case ADD_POST_SUCCESS:
    case EDIT_POST_SUCCESS:
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
    case FETCH_ALL_POSTS_SUCCESS:
    case FETCH_ALL_POSTS_ERROR:
      return false;
    case FETCH_ALL_POSTS_START:
      return true;
    default:
      return state;
  }
};

export const isFetchingSingle = (state = false, payload) => {
  switch (payload.type) {
    case FETCH_SINGLE_POST_START:
      return true;
    case FETCH_SINGLE_POST_SUCCESS:
    case FETCH_SINGLE_POST_ERROR:
      return false;
    default:
      return state;
  }
}
