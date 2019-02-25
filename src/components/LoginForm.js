import React from "react";
//import PropTypes from "prop-types";

const LoginForm = ({ name, password, handleLogin }) => {
  return (
    <div className="loginform">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Käyttäjätunnus
          <input {...name} />
        </div>
        <div>
          salasana
          <input {...password} />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  );
};

/**  
 * LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
};
**/

export default LoginForm;
