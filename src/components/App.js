import { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404, Login, Register, Setting } from './';
import * as jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
function App(props) {
  const { posts, auth } = props;
  useEffect(() => {
    props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');
    console.log('auth', auth);

    if (token) {
      const user = jwtDecode(token);

      console.log('user', user);
      props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
  }, []);
  console.log('state in app.js', props);

  //If you declare component like this and use the component property in router dom then you get router elements in props
  // const Home = (props) => {
  //   console.log(props);
  //   return <h2>Hello to the World!</h2>;
  // };
  const PrivateRoute = (privateRouteProps) => {
    const { isLoggedin, path, component: Component } = privateRouteProps;
    return (
      <Route
        path={path}
        render={(props) => {
          return isLoggedin ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
    );
  };

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
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/home" component={Home} /> */}
          <Route exact path="/register" component={Register}></Route>
          <PrivateRoute
            path="/setting"
            component={Setting}
            isLoggedin={auth.isLoggedin}
          />
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
    auth: state.auth,
  };
};

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
