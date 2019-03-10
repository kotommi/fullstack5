import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Users from "./components/Users";
import Home from "./components/Home";
import User from "./components/User";
import Blog from "./components/Blog";
import { connect } from "react-redux";
import { initBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { initUsers } from "./reducers/userlistReducer";
import Menu from "./components/Menu";

const App = props => {
  const user = props.user;

  // load blogs and user with effects
  useEffect(() => {
    props.initBlogs();
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      props.setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  useEffect(() => {
    props.initUsers();
  }, []);
  //

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    );
  } else {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Menu />
            <Notification />
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/users" render={() => <Users />} />
            <Route
              exact
              path="/users/:id"
              render={({ match }) => <User id={match.params.id} />}
            />
            <Route
              exact
              path="/blogs/:id"
              render={({ match }) => <Blog id={match.params.id} />}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { initBlogs, setUser, initUsers }
)(App);
