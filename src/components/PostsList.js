import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostsList = (props) => {
  console.log('props', props);
  const { posts } = props;
  return (
    <div>
      <div className="posts-list">
        {posts.map((post) => (
          <div className="post-wrapper" key={post._id}>
            <div className="post-header">
              <div className="post-avatar">
                <Link to={`/user/${post.user._id}`}>
                  <img
                    src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                    alt="user-pic"
                  />
                </Link>

                <div>
                  <div className="post-author">{post.user.name}</div>
                  <div className="post-time">a minute ago</div>
                </div>
              </div>
              <div className="post-content">{post.content}</div>
              <div className="post-actions">
                <div className="post-like">
                  <img
                    src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                    alt="likes-icon"
                  />
                  <span>{post.likes.length}</span>
                </div>
                <div className="post-comments-icon">
                  <img
                    src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                    alt="comments-icon"
                  />
                  <span>{post.comments.length}</span>
                </div>
              </div>
              <div className="post-comment-box">
                <input type="text" placeholder="Share what you feel" />
              </div>
              <div className="post-comments-list">
                <div className="post-comments-item">
                  <div className="post-comment-header">
                    <span className="post-comment-author">Bill</span>
                    <span className="post-comment-time">a minute ago</span>
                    <span className="post-comment-likes">22</span>
                  </div>
                  <div className="post-comment-content">Random Comment</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

//Checking the type of props passed to the component
PostsList.propTypes = {
  //Type of props and it is required
  posts: PropTypes.array.isRequired,
};

export default PostsList;
