import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

const Setting = (props) => {
  function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const reset = () => {
      setValue(initialValue);
    };
    const bind = {
      value,
      onChange: (e) => {
        setValue(e.target.value);
      },
    };
    return [value, bind, reset];
  }
  console.log('props', props);
  const { user } = props.auth;
  const [name, bindName, resetBindName] = useInput(props.auth.user.name);
  const [password, bindPassword, resetBindPassword] = useInput('');
  const [confirmPassword, bindConfirmPassword, resetBindConfirmPassword] =
    useInput('');
  const [editMode, setEditMode] = useState(false);
  const handleEditProfile = () => {
    setEditMode((prev) => !prev);
    resetBindName();
    resetBindConfirmPassword();
    resetBindPassword();
  };

  return (
    <div className="settings">
      <div className="img-container">
        <img
          src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
          alt="user-dp"
        />
      </div>
      <div className="field">
        <div className="field-label">Email</div>
        <div className="field-label">{user.email}</div>
      </div>
      <div className="field">
        <div className="field-label">Name</div>
        {editMode ? (
          <input type="text" {...bindName} />
        ) : (
          <div className="field-label">{user.name}</div>
        )}
      </div>
      {editMode && (
        <div className="field">
          <div className="field-label">New Password</div>
          <input type="text" {...bindPassword} />
        </div>
      )}
      {editMode && (
        <div className="field">
          <div className="field-label">Confirm Password</div>
          <input type="text" {...bindConfirmPassword} />
        </div>
      )}
      <div className="btn-grp">
        {editMode ? (
          <button className="button save-btn">Save</button>
        ) : (
          <button
            className="button edit-btn"
            onClick={() => handleEditProfile()}
          >
            Edit Profile
          </button>
        )}

        {editMode && (
          <div className="go-back" onClick={() => handleEditProfile()}>
            Go Back
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(Setting);
