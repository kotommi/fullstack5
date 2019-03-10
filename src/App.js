import React, { useEffect } from "react";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import UserControl from "./components/UserControl";
import { connect } from "react-redux";
import { initBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";

const App = props => {
  const user = props.user;
  const blogFormRef = React.createRef();

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
        <h2>blogs</h2>
        <Notification />
        <UserControl />
        <Togglable buttonLabel={"create new"} ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
        <BlogList />
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
  { initBlogs, setUser }
)(App);
