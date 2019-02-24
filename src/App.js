import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

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

const makeRows = blogs => {
  return (
    <div>
      {blogs.map(blog => (
        <Blog key={blog.title} blog={blog} />
      ))}
    </div>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setErrorMessage = asd => {
    console.log(asd);
  };

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("käyttäjätunnus tai salasana virheellinen");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // load blogs from api
  //useEffect(() => {
  //  blogService.getAll().then(blogs => setBlogs(blogs));
  //}, []);

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
        <h2>log in to application</h2>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.username} is logged in</p>
        <button onClick={handleLogout}>logout</button>
        {makeRows(blogs)}
      </div>
    );
  }
};

export default App;
