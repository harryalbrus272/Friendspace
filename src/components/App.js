import { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import { PostsList, Navbar } from './';
function App(props) {
  const { posts } = props;
  useEffect(() => {
    fetchPosts();
  }, []);
  console.log('state in app.js', props);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <PostsList posts={posts} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
let mapStateToProps = (state) => {
  return {
    posts: state.posts,
    users: state.users,
  };
};

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
