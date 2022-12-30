import React, { Component, useState } from "react";
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

const ShowForm = (props) => {
  const { dispatch, voting, category, canidateOne, canidateTwo, account } =
    props;

  const [pollClicked, setPollClicked] = useState(true);
  const [voteClicked, setVoteClicked] = useState(false);

  return (
    <>
      <div className="all-container">
        <div className="create-active-container">
          <form
            className={`${pollClicked ? "create-poll-form" : ""}`}
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
            <p
              onClick={() => {
                setVoteClicked(true);
                setPollClicked(false);
                console.log(voteClicked);
              }}
            >
              Vote
            </p>
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

const CreatePoll = (props) => {
  return <div>{ShowForm(props)}</div>;
};
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
