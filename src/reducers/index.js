import { combineReducer } from 'redux';
import posts from './posts';
import users from './users';
export default combineReducer({ posts, users });
