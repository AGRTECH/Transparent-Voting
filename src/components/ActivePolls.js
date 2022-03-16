import React from "react";
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
import { voteFunc, voteCount } from "../store/interactions";
import Countdown from "./Countdown";
import { counter } from "../store/actions";

const ActivePolls = (props) => {
  const renderPoll = (poll, props) => {
    const { dispatch, voting, account } = props;
    const gap = 1647297470;
    let formattedCanOne = poll.choice1
      .split("")
      .filter((a, b) => b !== 0)
      .map((c, d) => c.toLowerCase())
      .join("");

    let formattedCanTwo = poll.choice2
      .split("")
      .filter((a, b) => b !== 0)
      .map((c, d) => c.toLowerCase())
      .join("");

    let formattedCat = poll.poll
      .split("")
      .filter((a, b) => b !== 0)
      .map((c, d) => c.toLowerCase())
      .join("");

    dispatch(counter(poll.timestamp - gap));
    if (poll.timestamp - gap > 0) {
      return (
        <tr key={poll.id} className="">
          <td>{poll.id}</td>
          <td>{poll.poll[0].toUpperCase() + formattedCat}</td>
          <td>
            <p>{poll.choice1[0].toUpperCase() + formattedCanOne}</p>
            <button
              onClick={(e) => {
                voteFunc(dispatch, voting, account, poll.choice1, poll.poll);
                voteCount(dispatch, voting, poll.choice1);
              }}
            >
              vote
            </button>
          </td>

          <td>
            <p>{poll.choice2[0].toUpperCase() + formattedCanTwo}</p>
            <button
              onClick={(e) => {
                voteFunc(dispatch, voting, account, poll.choice2, poll.poll);
                voteCount(dispatch, voting, poll.choice2);
              }}
            >
              vote
            </button>
          </td>
          <td>
            <Countdown time={poll.timestamp - gap} />
          </td>
        </tr>
      );
    }
  };

  const showAllPolls = (props) => {
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
          allPolls.data.map((poll) => renderPoll(poll, props))
        ) : (
          <tr>
            <td>No polls to show...</td>
          </tr>
        )}
      </tbody>
    );
  };

  return (
    <table className="table table-dark">
      {props.pollCreated ? (
        showAllPolls(props)
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
