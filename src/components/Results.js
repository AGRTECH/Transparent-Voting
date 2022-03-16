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
  votingLoadedSelector,
  allVotesSelector,
  allVotesLoadedSelector,
} from "../store/selectors";

const Results = (props) => {
  const renderResult = (poll, props) => {
    const { votingLoaded, allPollsLoaded, allVotes, allVotesLoaded } = props;
    const gap = 1647497470;
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
    if (poll.timestamp - gap <= 0) {
      return (
        <tr key={poll.id} className="">
          <td>{poll.id}</td>
          <td>{poll.poll[0].toUpperCase() + formattedCat}</td>
          <td>
            <p>{poll.choice1[0].toUpperCase() + formattedCanOne}</p>
          </td>

          <td>
            <p>{poll.choice2[0].toUpperCase() + formattedCanTwo}</p>
          </td>
          <td>{votes1}</td>
          <td>{votes2}</td>
          <td className="text-success">
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

  const showAllResults = (props) => {
    const { allPolls, allPollsLoaded } = props;

    return (
      <tbody>
        <tr>
          <th>Poll #</th>
          <th>Poll Category</th>
          <th>Canidate One</th>
          <th>Canidate Two</th>
          <th>Final Votes (Canidate One)</th>
          <th>Final Votes (Canidate Two)</th>
          <th>Winner</th>
        </tr>
        {allPollsLoaded && allPolls.data.length > 0 ? (
          allPolls.data.map((poll) => renderResult(poll, props))
        ) : (
          <tr>
            <td>No results to show...</td>
          </tr>
        )}
      </tbody>
    );
  };

  return (
    <table className="table table-dark">
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
