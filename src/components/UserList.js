import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const UserList = props => {
  const getRows = () => {
    if (!props.users) {
      return <h2>Users</h2>;
    }
    return props.users.map(user => {
      return (
        <tr key={user.id}>
          <th>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
          </th>
          <th>{user.blogs ? user.blogs.length : 0}</th>
        </tr>
      );
    });
  };

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>username</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>{getRows()}</tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => {
  return { users: state.users };
};

export default connect(mapStateToProps)(UserList);
