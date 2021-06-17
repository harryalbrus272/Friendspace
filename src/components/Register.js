import React, { useState } from 'react';
import { connect } from 'react-redux';
import { startSingup, signup } from '../actions/auth';

const Register = (props) => {
  const { inProgress, error } = props.auth;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setconfirmPassword(event.target.value);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (email && password && name && confirmPassword) {
      console.log('props in register', props);
      props.dispatch(startSingup());
      props.dispatch(signup(email, password, confirmPassword, name));
    }
  };
  return (
    <form onSubmit={handleFormSubmit} className="login-form">
      <span className="login-signup-header"> Signup</span>
      {error && <div className="alert error-dailog">{error}</div>}
      <div className="field">
        <input
          placeholder="Name"
          type="text"
          required
          onChange={(e) => handleNameChange(e)}
        />
      </div>
      <div className="field">
        <input
          placeholder="Email"
          type="email"
          required
          onChange={(e) => handleEmailChange(e)}
        />
      </div>
      <div className="field">
        <input
          placeholder="Password"
          type="password"
          required
          onChange={(e) => handlePasswordChange(e)}
        />
      </div>
      <div className="field">
        <input
          placeholder="Confirm password"
          type="password"
          required
          onChange={(e) => handleConfirmPasswordChange(e)}
        />
      </div>
      <div className="field">
        <button type="submit" disabled={inProgress}>
          Signup
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(Register);
