import { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404 } from './';
function App(props) {
  const { posts } = props;
  useEffect(() => {
    fetchPosts();
  }, []);
  console.log('state in app.js', props);

  //If you declare component like this and use the component property in router dom then you get router elements in props
  // const Home = (props) => {
  //   console.log(props);
  //   return <h2>Hello to the World!</h2>;
  // };
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} posts={posts} />}
          />
          {/* <Route exact path="/home" component={Home} /> */}
          <Route component={Page404} />
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
