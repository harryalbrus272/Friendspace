import React, { useState } from 'react';
const Login = () => {
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
    console.log('email', email, 'password', password);
    console.log('Called Submit in login', event);
  };
  return (
    <form className="login-form" onSubmit={handleFormSubmit}>
      <span className="login-signup-header">Log In</span>
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
        <button type="submit">Log In</button>
      </div>
    </form>
  );
};

export default Login;
