import React from 'react';
import { PostsList, FriendsList, Chat } from './';

const Home = (props) => {
  const { posts, friends,isLoggedin } = props;
  return (
    <div className="home">
      <PostsList posts={posts} />
      {isLoggedin && <FriendsList friends={friends} />}
      {isLoggedin && <Chat />}
    </div>
  );
};

export default Home;
