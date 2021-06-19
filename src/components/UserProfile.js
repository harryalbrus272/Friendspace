import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/profile';

const UserProfile = (props) => {
  console.log('props in UserProfile', props);
  //params inside the match destructured
  const {
    match: { params },
    profile,
    match,
    friends,
  } = props;

  const user = profile.user;
  useEffect(() => {
    if (match.params.userId) {
      //dispatch an action
      props.dispatch(fetchUserProfile(match.params.userId));
    }
  }, []);

  const checkIfUserIsAFriend = () => {
    const userId = match.params.userId;
    console.log(friends);
    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);
    if (index !== -1) return true;
    return false;
  };

  console.log('props', params);
  if (profile.inProgress) return <h1>Loading friend profile</h1>;
  return (
    <div className="settings">
      <div className="img-container">
        <img
          src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
          alt="user-dp"
        />
      </div>

      <div className="field">
        <div className="field-label">Name</div>
        <div className="field-value">{user.name}</div>
      </div>

      <div className="field">
        <div className="field-label">Email</div>
        <div className="field-value">{user.email}</div>
      </div>

      <div className="btn-grp">
        {!checkIfUserIsAFriend() ? (
          <button className="button save-btn">Add Friend</button>
        ) : (
          <button className="button save-btn">Remove Friend</button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ profile, friends }) => {
  return {
    profile,
    friends,
  };
};

export default connect(mapStateToProps)(UserProfile);
