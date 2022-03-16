import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import { accountSelector, accountLoadedSelector } from "../store/selectors";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark navflex">
        <h1 className="navbar-brand">Transparent Voting</h1>
        {this.props.accountLoaded ? (
          <p className="text-muted">
            <b>Account:</b> {this.props.account}
          </p>
        ) : (
          <p>Please Connect Your Wallet</p>
        )}
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: accountSelector(state),
    accountLoaded: accountLoadedSelector(state),
  };
}

export default connect(mapStateToProps)(Navbar);
