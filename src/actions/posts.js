import APIUrls from '../helpers/urls';
import { UPDATE_POSTS } from './actionTypes';
export function fetchPosts() {
  return (dispatch) => {
    const url = APIUrls.fetchPosts('posts', 15);
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(updatePosts(data.data.posts));
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}
