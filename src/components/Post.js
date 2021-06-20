import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createComment } from '../actions/posts';
import { Comments } from './';
const Post = ({ post, dispatch }) => {
  const [comment, setComment] = useState('');
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

export default connect()(Post);
