import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import { PostsList } from './';
function App(props) {
  const { posts } = props;
  useEffect(() => {
    fetchPosts();
  }, []);
  console.log('state in app.js', props);

  return (
    <div className="App">
      <nav className="nav">
        <div className="left-nav">
          <img
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
            alt="logo"
          />
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://image.flaticon.com/icons/svg/483/483356.svg"
            alt="search-icon"
          />
          <input type="text" placeholder="Search anything here" />
          <div className="search-results">
            <ul>
              <li className="search-results-row">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                />
                <span>John Doe</span>
              </li>
              <li className="search-results-row">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                />
                <span>John Doe</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-nav">
          <div className="user">
            <img
              src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
              alt="user-dp"
              id="user-dp"
            />
            <span>John Doe</span>
          </div>
          <div className="nav-links">
            <ul>
              <li>Login</li>
              <li>Log Out</li>
              <li>Register</li>
            </ul>
          </div>
        </div>
      </nav>
      <PostsList posts={posts} />
    </div>
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
