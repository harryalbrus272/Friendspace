import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { clearAuthState, login } from '../actions/auth';
const Login = (props) => {
  const { error, inProgress } = props.auth;
  console.log(props);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //using Ref in the class based component to make a uncontroled component- a component whose state is not directly controlled by React.
  // constructor(props) {
  //      super(props);
  //     this.emailInputRef = React.createRef();
  //     this.passwordInputRef = React.createRef();
  // }
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      console.log('props in login', props);
      props.dispatch(login(email, password));
    }
  };
  //clearing the error
  useEffect(() => {
    return () => {
      props.dispatch(clearAuthState())
    }
  }, []);

  return (
    <form className="login-form" onSubmit={handleFormSubmit}>
      <span className="login-signup-header">Log In</span>
      {error && <div className="alert error-dailog">{error}</div>}
      <div className="field">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div className="field">
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <div className="field">
        {inProgress ? (
          <button type="submit" disabled={inProgress}>
            Logging In ...
          </button>
        ) : (
          <button type="submit" disabled={inProgress}>
            Log In
          </button>
        )}
      </div>
    </form>
  );
};
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Login);
