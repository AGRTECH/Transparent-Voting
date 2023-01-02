import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import CreatePoll from "./CreatePoll";
import ActivePolls from "./ActivePolls";
import Results from "./Results";
import "./App.css";
import {
  subscribeToEvents,
  loadAllData,
  loadVoting,
  loadWeb3,
} from "../store/interactions";
import { votingSelector, votingLoadedSelector } from "../store/selectors";
import { connect } from "react-redux";

class PollTabs extends Component {
  UNSAFE_componentWillMount() {
    this.loadBlockchainData(this.props);
  }

  async loadBlockchainData(props) {
    const { dispatch } = props;
    const web3 = loadWeb3(dispatch);
    await web3.eth.net.getNetworkType();
    const networkId = await web3.eth.net.getId();
    const voting = await loadVoting(web3, networkId, dispatch);
    if (!voting) {
      // window.alert(
      //   "Token smart contract not detcted on the current network. Please select another network with Metamask"
      // );
    } else {
      await loadAllData(voting, dispatch);
      await subscribeToEvents(voting, dispatch);
    }
  }

  render() {
    return (
      <>
        <CreatePoll />
        {/* <ActivePolls /> */}
        {/* <Results /> */}
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    voting: votingSelector(state),
    votingLoaded: votingLoadedSelector(state),
  };
}

export default connect(mapStateToProps)(PollTabs);
