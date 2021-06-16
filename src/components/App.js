import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import {PostsList} from './';
function App(props) {
  const { posts } = props;
  useEffect(() => {
    fetchPosts();
  }, []);
  console.log('state in app.js', props);

  return (
    <div className="App">
      <PostsList posts={posts}/>
    </div>
  );
}
let mapStateToProps = (state) => {
  return {
    posts: state.posts,
    users: state.users,
  };
};

export default connect(mapStateToProps)(App);
