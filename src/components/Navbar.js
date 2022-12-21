import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import {
  accountSelector,
  accountLoadedSelector,
  votingLoadedSelector,
} from "../store/selectors";
import logo from "../img/Transparentlogo.png";
import Web3 from "web3";

const Navbar = (props) => {
  const [account, setAccount] = useState([]);

  const connectToWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      window.web3 = new Web3(window.ethereum);
    } else {
      console.log("No wallet");
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
  };

  const checkWalletConnect = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    setAccount(account);
  };

  useEffect(() => {
    checkWalletConnect();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navflex">
      <img className="logo-img" src={logo} alt="" />
      {props.accountLoaded ? (
        <a className=" nav-account">
          {props.votingLoaded
            ? `Account: ${props.account
                .split("")
                .splice(0, 5, "")
                .join("")}...${props.account
                .split("")
                .splice(38, 4, "")
                .join("")}`
            : window.ethereum.networkVersion !== 5 && account.length > 1
            ? "Please Switch to Goerli"
            : "Connect Wallet"}
        </a>
      ) : (
        <p>Please Connect Your Wallet</p>
      )}
    </nav>
  );
};

function mapStateToProps(state) {
  return {
    account: accountSelector(state),
    accountLoaded: accountLoadedSelector(state),
    votingLoaded: votingLoadedSelector(state),
  };
}

export default connect(mapStateToProps)(Navbar);
