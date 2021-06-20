import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions/posts';

const CreatePost = (props) => {
  const [content, setContent] = useState('');
  const handleOnChange = (event) => {
      setContent(event.target.value);
  };
  const onClickHandle = () => {
      //dispatch an action to create the post
      props.dispatch(createPost(content));
  };
  return (
    <div className="create-post">
      <textarea
        className="add-post"
        value={content}
        onChange={handleOnChange}
      />
      <div>
          <button id="add-post-btn" onClick={onClickHandle}>Post!</button>
      </div>
    </div>
  );
};

export default connect() (CreatePost);
