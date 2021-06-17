const API_ROOT = 'http://codeial.codingninjas.com:8000/api/v2';
const APIUrls = {
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
  fetchPosts: (page, limit) => `${API_ROOT}/posts?page=${page}&limit=${limit}`,
};
export default APIUrls;
