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
import { voteFunc } from "../store/interactions";
import Countdown from "./Countdown";
import { counter } from "../store/actions";

const ActivePolls = (props) => {
  const renderPoll = (poll, props, timestampArr) => {
    const { dispatch, voting, account } = props;
    let now = new Date();
    let currentTime = now.getTime() / 1000;
    const gap = 1648797470;
    console.log(poll.timestamp, currentTime);
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
    if (poll.timestamp > currentTime - 43200) {
      return (
        <tr key={poll.id} className="real-time-polls">
          <td className="real-time-polls-sections">{poll.id}</td>
          <td className="real-time-polls-sections">
            {poll.poll[0].toUpperCase() + formattedCat}
          </td>
          <td className="real-time-polls-sections">
            <p>{poll.choice1[0].toUpperCase() + formattedCanOne}</p>
            <button
              className="btn btn-primary active-poll-btn"
              onClick={(e) => {
                voteFunc(
                  dispatch,
                  voting,
                  account,
                  poll.choice1,
                  poll.poll,
                  poll.id
                );
              }}
            >
              Vote
            </button>
          </td>

          <td className="real-time-polls-sections">
            <p>{poll.choice2[0].toUpperCase() + formattedCanTwo}</p>
            <button
              className="btn btn-primary active-poll-btn"
              onClick={(e) => {
                voteFunc(
                  dispatch,
                  voting,
                  account,
                  poll.choice2,
                  poll.poll,
                  poll.id
                );
              }}
            >
              Vote
            </button>
          </td>
          <Countdown
            time={poll.timestamp - (currentTime - 43200)}
            timestampArr={timestampArr}
          />
          <td className="real-time-polls-sections-last">{`${poll.user
            .split("")
            .splice(0, 5, "")
            .join("")}...${poll.user
            .split("")
            .splice(38, 4, "")
            .join("")}`}</td>
        </tr>
      );
    }
  };
  let timestampArr = [];
  const showAllPolls = (props) => {
    const { allPolls, allPollsLoaded } = props;
    const gap = 1647397470;
    for (let i = 0; i < allPolls.data.length; i++) {
      timestampArr.push(allPolls.data[i].timestamp - gap);
    }

    return (
      <tbody className="">
        <tr>
          <th className="active-polls-sections">#</th>
          <th className="active-polls-sections">Category</th>
          <th className="active-polls-sections">Canidate One</th>
          <th className="active-polls-sections">Canidate Two</th>
          <th className="active-polls-sections">Time</th>
          <th className="active-polls-sections-last">Submitted By</th>
        </tr>
        {allPollsLoaded && allPolls.data.length > 0 ? (
          allPolls.data.map((poll) => renderPoll(poll, props, timestampArr))
        ) : (
          <tr>
            <td>No polls to show...</td>
          </tr>
        )}
      </tbody>
    );
  };

  return (
    <table className="active-polls-container">
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
