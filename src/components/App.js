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
import { Home, Navbar, Page404, Login, Register, Setting, UserProfile } from './';
import * as jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { fetchUserFriends } from '../actions/friends';
function App(props) {
  const { posts, auth, friends } = props;
  useEffect(() => {
    props.dispatch(fetchPosts());
    const token = getAuthTokenFromLocalStorage();
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
      props.dispatch(fetchUserFriends());
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
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
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
            render={(props) => <Home {...props} posts={posts} friends={friends} isLoggedin={auth.isLoggedin} />}
          />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/home" component={Home} /> */}
          <Route exact path="/register" component={Register}></Route>
          <PrivateRoute
            path="/setting"
            component={Setting}
            isLoggedin={auth.isLoggedin}
          />
          <PrivateRoute
            path="/user/:userId"
            component={UserProfile}
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
