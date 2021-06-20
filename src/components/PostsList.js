import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {CreatePost, Post} from './';
import { useState } from 'react';

const PostsList = (props) => {
  const { posts } = props;
  return (
    <div className="posts-list">
      <CreatePost />
      {posts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
};

//Checking the type of props passed to the component
PostsList.propTypes = {
  //Type of props and it is required
  posts: PropTypes.array.isRequired,
};

export default PostsList;
