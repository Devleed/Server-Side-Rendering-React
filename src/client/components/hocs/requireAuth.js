import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// higher-order component

export default ChildComponent => {
  console.log("clldwd========")
  class RequireAuth extends Component {
    render() {
      switch (this.props.auth) {
        case false:
          return <Redirect to="/" />;
        case null:
          return <div>loading</div>;
        default:
          return <ChildComponent {...this.props} />;
      }
    }
  }

  const mapStateToProps = ({ auth }) => {
    return { auth };
  };

  return connect(mapStateToProps)(RequireAuth);
};
