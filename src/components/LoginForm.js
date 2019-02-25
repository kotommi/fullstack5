import React from "react";
import PropTypes from "prop-types";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin
}) => {
  return (
    <div className="loginform">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Käyttäjätunnus
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          salasana
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
};

export default LoginForm;
