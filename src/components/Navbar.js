import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import wallet from "../img/biggerwallet1.png";
import leftArrow from "../img/larrow.png";
import "./App.css";
import ArrowOverlay from "./ArrowOverlay";
import {
  accountSelector,
  accountLoadedSelector,
  votingLoadedSelector,
} from "../store/selectors";
import logo from "../img/transparentvotinglogowhitetext.png";
import ethLogo from "../img/ethlogo.svg";
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
    <nav className="navbar navbar-expand-lg navbar-dark  navflex">
      <img className="logo-img" src={logo} alt="" />
      <div>
        <img
          src={ethLogo}
          style={{
            width: "50px",
            height: "45px",
            zIndex: "100",
            marginRight: "-32px",
            marginBottom: "5px",
            position: "relative",
          }}
          alt=""
        />
        <a className="no-underline">
          {window.ethereum.networkVersion === "5" && props.votingLoaded ? (
            <>
              <a className="nav-account">Goerli </a>
              {/* <a className="down-arrow">
                <img
                  src={leftArrow}
                  style={{
                    width: "8px",
                    height: "15px",
                    rotate: "270deg",
                    marginLeft: "5px",
                  }}
                  alt=""
                />
              </a> */}
              <ArrowOverlay />
            </>
          ) : (
            "Please switch to Goerli"
          )}
          {console.log(typeof window.ethereum.networkVersion)}
        </a>
        <img
          src={wallet}
          style={{
            width: "55px",
            height: "50px",
            border: "3px solid black",
            borderRadius: "50%",
            zIndex: "100",
            marginRight: "-32px",
            marginBottom: "3px",
            position: "relative",
            backgroundColor: "#905ece",
          }}
          alt=""
        />
        {props.accountLoaded ? (
          <>
            <a className=" nav-account">
              {props.votingLoaded
                ? `${props.account
                    .split("")
                    .splice(0, 2, "")
                    .join("")}...${props.account
                    .split("")
                    .splice(38, 4, "")
                    .join("")}`
                : window.ethereum.networkVersion !== "5" && account.length > 1
                ? "---"
                : "Connect Wallet"}
            </a>
            <a className="down-arrow-last">
              <img
                src={leftArrow}
                style={{
                  width: "8px",
                  height: "15px",
                  rotate: "270deg",
                  marginLeft: "5px",
                }}
                alt=""
              />
            </a>
          </>
        ) : (
          <p>Please Connect Your Wallet</p>
        )}
      </div>
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
