import React from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useField } from "../hooks/index";
import { connect } from "react-redux";
import { setUser } from "../reducers/userReducer";
import { changeNotification } from "../reducers/notificationReducer";

const LoginForm = props => {
  const [name, resetName] = useField("text");
  const [password, resetPassword] = useField("password");

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: name.value,
        password: password.value
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      resetName();
      resetPassword();
      props.setUser(user);
    } catch (exception) {
      props.changeNotification(exception.response.data.error);
    }
  };

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

export default connect(
  null,
  { setUser, changeNotification }
)(LoginForm);
