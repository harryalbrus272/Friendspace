import APIUrls from '../helpers/urls';
import { UPDATE_POSTS } from './actionTypes';
export function fetchPosts() {
  return (dispatch) => {
    const url = APIUrls.fetchPosts('posts', 5);
    fetch(url)
      .then((res) => {
        console.log('res', res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
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
