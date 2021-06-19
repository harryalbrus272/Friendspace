import React from 'react';
import { PostsList, FriendsList } from './';

const Home = (props) => {
  const { posts, friends,isLoggedin } = props;
  return (
    <div className="home">
      <PostsList posts={posts} />
      {isLoggedin && <FriendsList friends={friends} />}
    </div>
  );
};

export default Home;
