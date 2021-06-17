import { UPDATE_POSTS } from '../actions/actionTypes';
export default function posts(state = [], action) {
  console.log('action', action);
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    default:
      return state;
  }
}
