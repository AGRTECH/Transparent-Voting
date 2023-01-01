import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import leftArrow from "../img/larrow.png";
import rightArrow from "../img/rarrow.png";
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
  votingLoadedSelector,
  allVotesSelector,
  allVotesLoadedSelector,
} from "../store/selectors";

const Results = (props) => {
  let resultsArr = [];
  let fullResultsArr = [];
  const renderResult = (poll, props) => {
    const { votingLoaded, allPollsLoaded, allVotes, allVotesLoaded } = props;
    const gap = 1649897470;
    let now = new Date();
    let currentTime = now.getTime() / 1000;
    let votes1 = 0;
    let votes2 = 0;

    if (allVotesLoaded) {
      for (let i = 0; i < allVotes.length; i++) {
        if (
          allVotes[i].choice === poll.choice1 &&
          allVotes[i].pollId === poll.id
        ) {
          votes1 = allVotes[i].voteCount;
        } else if (
          allVotes[i].choice === poll.choice2 &&
          allVotes[i].pollId === poll.id
        ) {
          votes2 = allVotes[i].voteCount;
        }
      }
    }

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

    if (poll.timestamp < currentTime - 43200) {
      fullResultsArr.push(parseInt(poll.id));
    }

    if (
      poll.timestamp < currentTime - 43200 &&
      poll.id >= firstPoll &&
      poll.id <= lastPoll
    ) {
      {
        resultsArr.push(parseInt(poll.id));
      }
      return (
        <tr key={poll.id} className="">
          <td className="results-sections">{poll.id}</td>
          <td className="results-sections">
            {poll.poll[0].toUpperCase() + formattedCat}
          </td>
          <td className="results-sections">
            <p>{poll.choice1[0].toUpperCase() + formattedCanOne}</p>
          </td>

          <td className="results-sections">
            <p>{poll.choice2[0].toUpperCase() + formattedCanTwo}</p>
          </td>
          <td className="results-sections">{votes1}</td>
          <td className="results-sections">{votes2}</td>
          <td className="text-success results-sections">
            {votingLoaded && allPollsLoaded && allVotesLoaded && votes1 > votes2
              ? poll.choice1[0].toUpperCase() + formattedCanOne
              : votes2 > votes1
              ? poll.choice2[0].toUpperCase() + formattedCanTwo
              : "It's a tie!"}
          </td>
        </tr>
      );
    }
  };

  const [firstPoll, setFirstPoll] = useState(1);
  const [lastPoll, setLastPoll] = useState(7);

  // Table pagination
  // useEffect(() => {
  //   setFirstPoll(
  //     props.allPollsLoaded
  //       ? props.allPolls.data.length - (props.allPolls.data.length + 1)
  //       : 0
  //   );
  //   setLastPoll(props.allPollsLoaded ? firstPoll + 8 : 0);
  // }, [props.allPollsLoaded]);

  const showAllResults = (props) => {
    const { allPolls, allPollsLoaded } = props;

    return (
      <th className="active-poll-title">
        Results
        <tbody>
          <tr className="results-heads">
            <th className="results-titles">Poll #</th>
            <th className="results-titles">Poll Category</th>
            <th className="results-titles">Canidate One</th>
            <th className="results-titles">Canidate Two</th>
            <th className="results-titles">Final Votes (Canidate One)</th>
            <th className="results-titles">Final Votes (Canidate Two)</th>
            <th className="results-titles">Winner</th>
          </tr>
          {allPollsLoaded && allPolls.data.length > 0 ? (
            allPolls.data.map((poll) => renderResult(poll, props))
          ) : (
            <tr>
              <td>No results to show...</td>
            </tr>
          )}
        </tbody>
      </th>
    );
  };

  return (
    <div>
      <table className="results-container">
        {props.pollCreated ? (
          showAllResults(props)
        ) : (
          <tbody>
            <tr>
              <td>"No results right now..."</td>
            </tr>
          </tbody>
        )}
      </table>
      <div
        style={{
          backgroundColor: "rgba(62, 62, 62, 1)",
          borderRadius: "12px",
          width: "10%",
          marginLeft: "470px",
          marginBottom: "100px",
          padding: "5px 0px",
          boxShadow: "0px 3px 5px 0px rgba(0, 0, 0, 0.75)",
        }}
      >
        <img
          className="arrow"
          src={leftArrow}
          style={{
            width: "12px",
            height: "17px",
            marginLeft: "32px",
            marginBottom: "4px",
          }}
          alt=""
          onClick={() => {
            if (firstPoll - 1 == 0) {
              return;
            } else {
              setFirstPoll((poll) => {
                return poll - 7;
              });
              setLastPoll((poll) => {
                return poll - 7;
              });
            }
          }}
        />
        <img
          className="arrow"
          src={rightArrow}
          style={{
            width: "12px",
            height: "17px",
            marginLeft: "15px",
            marginBottom: "4px",
          }}
          alt=""
          onClick={() => {
            if (!fullResultsArr.includes(resultsArr[0] + 7)) {
              return;
            } else {
              setFirstPoll((poll) => {
                return poll + 7;
              });
              setLastPoll((poll) => {
                return poll + 7;
              });
            }
          }}
        />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    voting: votingSelector(state),
    votingLoaded: votingLoadedSelector(state),
    allVotes: allVotesSelector(state),
    allVotesLoaded: allVotesLoadedSelector(state),
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

export default connect(mapStateToProps)(Results);
