import React, { useState, useEffect } from "react";
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
  allPollsSelector,
  allPollsLoadedSelector,
} from "../store/selectors";
import { voteFunc } from "../store/interactions";
import moment from "moment";

// const countdown = () => {
//   const countDate = new Date("April 15, 2022 00:00:00").getTime();
//   const now = new Date().getTime();
//   const gap = countDate - now;

//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const textDay = Math.floor(gap / day);
//   const textHour = Math.floor((gap % day) / hour);
//   const textMinute = Math.floor((gap % hour) / minute);
//   const textSecond = Math.floor((gap % minute) / second);

//   return textSecond;
// };

const renderPoll = (poll, props, seconds) => {
  const { dispatch, voting, account } = props;

  return (
    <tr key={poll.id} className="">
      <td>{poll.id}</td>
      <td>{poll.poll}</td>
      <td>
        <p>{poll.choice1}</p>
        <button
          onClick={(e) => {
            voteFunc(dispatch, voting, account, poll.choice1, poll.poll);
          }}
        >
          vote
        </button>
      </td>

      <td>
        <p>{poll.choice2}</p>
        <button
          onClick={(e) => {
            voteFunc(dispatch, voting, account, poll.choice2, poll.poll);
          }}
        >
          vote
        </button>
      </td>
      <td>{seconds}</td>
    </tr>
  );
};

const showAllPolls = (props, seconds) => {
  const { allPolls, allPollsLoaded } = props;
  return (
    <tbody>
      <tr>
        <th>Poll #</th>
        <th>Poll Category</th>
        <th>Canidate One</th>
        <th>Canidate Two</th>
        <th>Time Remaining</th>
      </tr>
      {allPollsLoaded && allPolls.data.length > 0 ? (
        allPolls.data.map((poll) => renderPoll(poll, props, seconds))
      ) : (
        <tr>
          <td>No polls to show...</td>
        </tr>
      )}
    </tbody>
  );
};

const ActivePolls = (props) => {
  const [seconds, setSeconds] = useState([]);
  const [polls, setPolls] = useState([]);
  useEffect(() => {
    if (props.allPollsLoaded) {
      setSeconds(props.allPolls.data[0].timestamp);
      setPolls(props.allPolls.data);
    }
  }, [props.allPollsLoaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <table className="table table-dark">
      {props.pollCreated ? (
        showAllPolls(props, seconds)
      ) : (
        <tbody>
          <tr>
            <td>"No active polls right now..."</td>
          </tr>
        </tbody>
      )}
    </table>
  );
};
function mapStateToProps(state) {
  return {
    voting: votingSelector(state),
    web3: web3Selector(state),
    category: categorySelector(state),
    canidateOne: canidateOneSelector(state),
    canidateTwo: canidateTwoSelector(state),
    account: accountSelector(state),
    pollCreated: pollCreatedSelector(state),
    allPolls: allPollsSelector(state),
    allPollsLoaded: allPollsLoadedSelector(state),
  };
}

export default connect(mapStateToProps)(ActivePolls);
