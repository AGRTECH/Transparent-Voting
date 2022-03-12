import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <h1 className="navbar-brand">Transparent Voting</h1>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Navbar);
