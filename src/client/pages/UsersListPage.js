import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import { fetchUsers } from "../actions";

class UsersList extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  renderUsers() {
    return this.props.users.map(user => <li key={user.id}>{user.name}</li>);
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Users</title>
          <meta property="og:title" content="Users" />
        </Helmet>
        <h1>Here's list of users</h1>
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return { users };
};

export default {
  loadData: store => store.dispatch(fetchUsers()),
  component: connect(mapStateToProps, { fetchUsers })(UsersList)
};
