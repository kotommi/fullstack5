import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useField } from "./hooks";
import BlogList from "./components/BlogList";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const name = useField("text");
  const password = useField("password");

  const blogFormRef = React.createRef();

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: name.input.value,
        password: password.input.value
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      name.reset.reset();
      password.reset.reset();
      setUser(user);
    } catch (exception) {
      console.log(exception);
      //handleErrorMessage(exception.response.data.error);
      //change to setNotification when App has redux props
    }
  };

  const removeBlog = async blog => {
    const confirmation = window.confirm(
      `remove blog ${blog.title} by ${blog.author}?`
    );
    if (!confirmation) {
      return;
    }
    try {
      await blogService.remove(blog.id);
      setBlogs(blogs.filter(b => b.id !== blog.id));
    } catch (e) {
      console.log(e);
    }
  };

  const blogHook = () => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  };

  useEffect(blogHook, []);

  // load user from localstorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    window.location.reload();
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm
          name={name.input}
          password={password.input}
          handleLogin={handleLogin}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>{user.username} is logged in</p>
        <button onClick={handleLogout}>logout</button>
        <Togglable buttonLabel={"create new"} ref={blogFormRef}>
          <BlogForm
            setBlogs={setBlogs}
            blogs={blogs}
            blogFormRef={blogFormRef}
          />
        </Togglable>
        <BlogList blogs={blogs} removeBlog={removeBlog} user={user} />
      </div>
    );
  }
};

export default App;
