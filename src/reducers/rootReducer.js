import { combineReducers } from 'redux';
import * as commentReducers from './commentReducers';
import * as postReducers from './postReducers';

const rootReducer = combineReducers({
  'comments': combineReducers(commentReducers),
  'posts': combineReducers(postReducers),
});

export default rootReducer;
