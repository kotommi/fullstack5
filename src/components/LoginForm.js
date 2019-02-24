import React from "react";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin
}) => {
  return (
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
  );
};

export default LoginForm;
