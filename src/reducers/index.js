import { combineReducers } from 'redux';
import posts from './posts';
import users from './users';
import auth from './auth';
import profile from './profile';
import friends from './friends';
export default combineReducers({ posts, users, auth, profile, friends });
