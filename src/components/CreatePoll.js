import React, { Component } from "react";
import { connect } from "react-redux";
import ActivePolls from "./ActivePolls";
import Results from "./Results";
import "./App.css";
import {
  categoryChanged,
  canidateOneChanged,
  canidateTwoChanged,
} from "../store/actions";
import { createPollFunc } from "../store/interactions";
import {
  votingSelector,
  web3Selector,
  categorySelector,
  canidateOneSelector,
  canidateTwoSelector,
  accountSelector,
} from "../store/selectors";

const showForm = (props) => {
  const { dispatch, voting, category, canidateOne, canidateTwo, account } =
    props;
  return (
    <>
      <div className="all-container">
        <div className="create-active-container">
          <form
            className="create-poll-form"
            onSubmit={(e) => {
              e.preventDefault();
              createPollFunc(
                dispatch,
                voting,
                account,
                category,
                canidateOne,
                canidateTwo
              );
            }}
          >
            <input
              type="text"
              placeholder=" Category"
              onChange={(e) => {
                dispatch(categoryChanged(e.target.value));
              }}
              className="poll-input"
              required
            />
            <input
              type="text"
              placeholder=" Enter First Canidate"
              onChange={(e) => {
                dispatch(canidateOneChanged(e.target.value));
              }}
              className="poll-input"
              required
            />
            <input
              type="text"
              placeholder=" Enter Second Canidate"
              onChange={(e) => {
                dispatch(canidateTwoChanged(e.target.value));
              }}
              className="poll-input"
              required
            />
            <button className="btn btn-primary create-poll-btn" type="submit">
              Create Poll
            </button>
          </form>
          <ActivePolls />
        </div>
        <Results />
      </div>
    </>
  );
};

class CreatePoll extends Component {
  render() {
    return <div>{showForm(this.props)}</div>;
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
  };
}

export default connect(mapStateToProps)(CreatePoll);
