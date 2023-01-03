import React, { Component, useState } from "react";
import { connect } from "react-redux";
import ActivePolls from "./ActivePolls";
import Results from "./Results";
import QuestionOverlay from "./QuestionOverlay";
import statsIcons from "../img/statsicon.png";
import { Modal, Button } from "react-bootstrap";
import "./App.css";
import {
  categoryChanged,
  canidateOneChanged,
  canidateTwoChanged,
} from "../store/actions";
import {
  createPollFunc,
  readVotes,
  readPollsCreated,
} from "../store/interactions";
import {
  votingSelector,
  web3Selector,
  categorySelector,
  canidateOneSelector,
  canidateTwoSelector,
  accountSelector,
  totalVotesSelector,
  totalPollsCreatedSelector,
  votingLoadedSelector,
} from "../store/selectors";

const ShowForm = (props) => {
  const {
    dispatch,
    voting,
    category,
    canidateOne,
    canidateTwo,
    account,
    totalVotes,
    totalPollsCreated,
  } = props;

  const [pollClicked, setPollClicked] = useState(true);
  const [voteClicked, setVoteClicked] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <div className="create-poll-top-div">
              <div className="create-poll-titles-div">
                <p className="create-poll-title">Create Poll</p>
                <p className="create-poll-title-desc">
                  web3.0 voter corruption solution
                </p>
              </div>
              <div className="create-poll-icons-div">
                <img
                  className="stats-img"
                  src={statsIcons}
                  style={{
                    width: "23px",
                    height: "20px",
                    marginBottom: "15px",
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    readVotes(dispatch, voting, account);
                    readPollsCreated(dispatch, voting, account);
                    setShow(true);
                  }}
                  alt=""
                />
                <QuestionOverlay />
              </div>
            </div>
            <div className="bar"></div>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modal-title">
          <Modal.Title className="modal-title">Stats</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p
            style={{
              textAlign: "center",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            {props.votingLoaded
              ? `${account.split("").splice(0, 2, "").join("")}...${account
                  .split("")
                  .splice(38, 4, "")
                  .join("")}`
              : ""}
          </p>
          <div className="bar"></div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0px 75px",
            }}
          >
            <p>
              Total Votes: <span style={{ color: "green" }}>{totalVotes}</span>{" "}
            </p>
            <p>
              Polls Created:{" "}
              <span style={{ color: "green" }}>{totalPollsCreated}</span>{" "}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const CreatePoll = (props) => {
  return (
    <>
      <div>{ShowForm(props)}</div>
    </>
  );
};
function mapStateToProps(state) {
  return {
    voting: votingSelector(state),
    votingLoaded: votingLoadedSelector(state),
    web3: web3Selector(state),
    category: categorySelector(state),
    canidateOne: canidateOneSelector(state),
    canidateTwo: canidateTwoSelector(state),
    account: accountSelector(state),
    totalVotes: totalVotesSelector(state),
    totalPollsCreated: totalPollsCreatedSelector(state),
  };
}

export default connect(mapStateToProps)(CreatePoll);
