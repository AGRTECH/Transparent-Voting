import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import Navbar from "./Navbar";
import PollTabs from "./PollTabs";
import { loadAccount, loadWeb3 } from "../store/interactions";
import ParticlesBg from "particles-bg";

class App extends Component {
  UNSAFE_componentWillMount() {
    this.loadBlockchainData(this.props.dispatch);
  }

  async loadBlockchainData(dispatch) {
    const web3 = loadWeb3(dispatch);
    await web3.eth.net.getNetworkType();
    await loadAccount(web3, dispatch);
  }

  render() {
    return (
      <div>
        <Navbar />
        <PollTabs />
        <ParticlesBg type="cobweb" bg={true} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(App);
