import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import Navbar from "./Navbar";
import Main from "./Main";
import CreatePoll from "./CreatePoll";
import { loadAccount, loadWeb3 } from "../store/interactions";
import ParticlesBg from "particles-bg";
import bg from "../img/blackbgfinall.png";

const App = (props) => {
  const [mounted, setMounted] = useState(false);

  const loadBlockchainData = async (dispatch) => {
    const web3 = loadWeb3(dispatch);
    await web3.eth.net.getNetworkType();
    await loadAccount(web3, dispatch);
  };

  if (!mounted) {
    loadBlockchainData(props.dispatch);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Navbar />
      <Main />
    </>
  );
};
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(App);
