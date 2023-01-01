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
} from "../store/selectors";
import { voteFunc } from "../store/interactions";
import Countdown from "./Countdown";
import SpinnerAnimation from "./Spinner";
import { counter } from "../store/actions";
import { Pagination } from "react-bootstrap";

const ActivePolls = (props) => {
  function TablePagnation() {
    return (
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    );
  }
  let now = new Date();
  let currentTime = now.getTime() / 1000;
  // poll.id > firstPoll &&
  // poll.id < lastPoll
  let activeArr = [];
  let fullActiveArr = [];

  const RenderPoll = (poll, props, timestampArr) => {
    const { dispatch, voting, account } = props;

    let now = new Date();
    let currentTime = now.getTime() / 1000;
    const gap = 1648797470;
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

    if (poll.timestamp > currentTime - 43200) {
      fullActiveArr.push(parseInt(poll.id));
    }

    if (
      poll.timestamp > currentTime - 43200 &&
      poll.id >= firstPoll &&
      poll.id <= lastPoll
    ) {
      {
        activeArr.push(parseInt(poll.id));
      }
      return (
        <tr key={poll.id} className="real-time-polls">
          <td className="real-time-polls-sections">{poll.id}</td>
          <td className="real-time-polls-sections">
            {poll.poll[0].toUpperCase() + formattedCat}
          </td>
          <td className="real-time-polls-sections">
            <p className="active-poll-canidate">
              {poll.choice1[0].toUpperCase() + formattedCanOne}
            </p>
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
            <p className="active-poll-canidate">
              {poll.choice2[0].toUpperCase() + formattedCanTwo}
            </p>
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
            .splice(0, 2, "")
            .join("")}...${poll.user
            .split("")
            .splice(38, 4, "")
            .join("")}`}</td>
        </tr>
      );
    }
  };

  let initalState = 0;
  if (props.allPollsLoaded) {
    initalState = props.allPolls.data.length - 1;
  }

  const [firstPoll, setFirstPoll] = useState(0);
  const [lastPoll, setLastPoll] = useState(0);

  // Table pagination
  useEffect(() => {
    setFirstPoll(props.allPollsLoaded ? props.allPolls.data.length - 2 : 0);
    setLastPoll(props.allPollsLoaded ? props.allPolls.data.length : 0);
  }, [props.allPollsLoaded]);

  let timestampArr = [];
  const showAllPolls = (props) => {
    const { allPolls, allPollsLoaded } = props;
    const gap = 1647397470;
    for (let i = 0; i < allPolls.data.length; i++) {
      timestampArr.push(allPolls.data[i].timestamp - gap);
    }

    // if (allPollsLoaded) {
    //   setLastPoll(15);
    // }

    return (
      <th className="active-poll-title">
        Active polls
        <tbody className="table-body-container">
          <tr>
            <th className="active-polls-sections">#</th>
            <th className="active-polls-sections">Category</th>
            <th className="active-polls-sections">Canidate One</th>
            <th className="active-polls-sections">Canidate Two</th>
            <th className="active-polls-sections">Time</th>
            <th className="active-polls-sections-last">Submitted By</th>
          </tr>
          {allPollsLoaded && allPolls.data.length > 0 ? (
            allPolls.data.map((poll) => RenderPoll(poll, props, timestampArr))
          ) : (
            <tr>
              <td>No polls to show...</td>
            </tr>
          )}
        </tbody>
      </th>
    );
  };

  return (
    <div className="table-arrow-container">
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
      <div
        style={{
          backgroundColor: "rgba(62, 62, 62, 1)",
          borderRadius: "12px",
          width: "20%",
          marginLeft: "190px",
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
            marginLeft: "28px",
            marginBottom: "4px",
          }}
          alt=""
          onClick={() => {
            if (!fullActiveArr.includes(activeArr[activeArr.length - 1] - 3)) {
              return;
            } else {
              setFirstPoll((poll) => {
                return poll - 3;
              });
              setLastPoll((poll) => {
                return poll - 3;
              });
              console.log(activeArr, lastPoll);
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
            if (props.allPolls.data.length <= lastPoll) {
              return;
            } else {
              setFirstPoll((poll) => {
                return poll + 3;
              });
              setLastPoll((poll) => {
                return poll + 3;
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
