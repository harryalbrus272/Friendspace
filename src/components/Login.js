import React from 'react';

const Login = () => {
  return (
    <form className="login-form">
      <span className="login-signup-header">Log In</span>
      <div className="field">
        <input type="email" name="email" placeholder="Email" required />
      </div>
      <div className="field">
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      <div className="field">
        <button type="submit">Log In</button>
      </div>
    </form>
  );
};

export default Login;
