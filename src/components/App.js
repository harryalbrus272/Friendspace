import { useEffect } from 'react';
import { connect } from 'react-redux';
import {fetchPosts} from '../actions/posts';
function App(props) {
  useEffect(() => {
    fetchPosts();
  },[]);
  console.log('state in app.js', props);

  return <div className="App">HelloWorld!</div>;
}
let mapStateToProps = (state) => {
  return {
    posts: state.posts,
    users: state.users
  };
}

export default connect(mapStateToProps)(App);
