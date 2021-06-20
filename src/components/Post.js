import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addLike, createComment } from '../actions/posts';
import { Comments } from './';
const Post = ({ post, dispatch, user }) => {
  const [comment, setComment] = useState('');
  console.log(user._id);
  const isPostLikedByUser = post.likes.includes(user._id);
  console.log(isPostLikedByUser);
  const onCommentChangeHandler = (event) => {
    console.log(event.key);
    setComment(event.target.value);
  };
  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      dispatch(createComment(comment, post._id));
      //clear the comment
      setComment('');
    }
  };

  const handlePostLike = () => {
    dispatch(addLike(post._id, 'Post', user._id));
  };

  return (
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
          <button
            className="post-like no-btn"
            onClick={(e) => handlePostLike(e)}
          >
            {isPostLikedByUser ? (
              <img
                src="https://as2.ftcdn.net/jpg/02/33/05/69/500_F_233056931_chB2vj6ThgrK2YRzKr9Ahg58XTw1K3Tn.jpg"
                alt="likes-post"
              />
            ) : (
              <img
                src="https://img-premium.flaticon.com/png/512/3269/premium/3269472.png?token=exp=1624201723~hmac=d8efd62d4b3c3fa74861622b3ed69549"
                alt="likes-icon"
              />
            )}

            <span>{post.likes.length}</span>
          </button>
          <div className="post-comments-icon">
            <img
              src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className="post-comment-box">
          <input
            type="text"
            placeholder="Share what you feel"
            value={comment}
            onChange={(e) => onCommentChangeHandler(e)}
            onKeyPress={(e) => onKeyPressHandler(e)}
          />
        </div>
        <div className="post-comments-list">
          {post.comments.map((comment) => (
            <Comments comment={comment} key={comment._id} postId={post._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps)(Post);
