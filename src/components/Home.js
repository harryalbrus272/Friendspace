import React from 'react';
import { PostsList } from './';

const Home = (props) => {
  const { posts } = props;
  return (
    <div>
      <PostsList posts={posts} />
    </div>
  );
};

export default Home;
