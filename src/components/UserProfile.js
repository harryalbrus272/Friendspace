import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addFriend, removeFriend } from '../actions/friends';
import { fetchUserProfile } from '../actions/profile';
import APIUrls from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

const UserProfile = (props) => {
  //params inside the match destructured
  const {
    match: { params },
    profile,
    match,
    friends,
  } = props;

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const user = profile.user;
  useEffect(() => {
    if (match.params.userId) {
      //dispatch an action
      props.dispatch(fetchUserProfile(match.params.userId));
    }
  }, []);

  const checkIfUserIsAFriend = () => {
    const userId = match.params.userId;
    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);
    if(index !== -1) return true;
    return false;
  };

  const handleAddFriend = async () => {
    const userId = params.userId;
    const url = APIUrls.addFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      setSuccess(true);
      setError(null);
      props.dispatch(addFriend(data.data.friendship));
    } else {
      setSuccess(null);
      setError(data.message);
    }
  };
  const handleRemoveFriend = async () => {
    const userId = params.userId;
    const url = APIUrls.removeFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      setSuccess(data.message);
      setError(null);
      props.dispatch(removeFriend(userId));
    } else {
      setSuccess(null);
      setError(data.message);
    }
  };

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
          <button className="button save-btn" onClick={() => handleAddFriend()}>
            Add Friend
          </button>
        ) : (
          <button
            className="button save-btn"
            onClick={() => handleRemoveFriend()}
          >
            Remove Friend
          </button>
        )}
        {success && (
          <div className="alert success-dailog">Friend added successfully</div>
        )}
        {error && <div className="alert error-dailog">{error}</div>}
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
