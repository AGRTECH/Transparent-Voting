import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import {
  votingSelector,
  web3Selector,
  categorySelector,
  canidateOneSelector,
  canidateTwoSelector,
  accountSelector,
  pollCreatedSelector,
} from "../store/selectors";
import { voteFunc } from "../store/interactions";

const showForm = (props) => {
  const { dispatch, voting, category, canidateOne, canidateTwo, account } =
    props;
  return (
    <div>
      <h1>Poll: {category}</h1>
      <h3>Canidate One: {canidateOne}</h3>
      <button
        onClick={(e) => {
          console.log("clicked");
        }}
      >
        Vote
      </button>
      <h3>Canidate Two: {canidateTwo}</h3>
      <button
        onClick={(e) => {
          console.log("clicked");
        }}
      >
        Vote
      </button>
    </div>
  );
};

class ActivePolls extends Component {
  render() {
    return (
      <div>
        {/* {this.props.polledCreated
          ? showForm(this.props)
          : "No active polls right now..."} */}
        {showForm(this.props)}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    voting: votingSelector(state),
    web3: web3Selector(state),
    category: categorySelector(state),
    canidateOne: canidateOneSelector(state),
    canidateTwo: canidateTwoSelector(state),
    account: accountSelector(state),
    pollCreated: pollCreatedSelector(state),
  };
}

export default connect(mapStateToProps)(ActivePolls);
