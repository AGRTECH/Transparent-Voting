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
import { counter } from "../store/actions";

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

const Countdown = (props) => {
  const timeLeft = Math.floor(new Date("2012.08.10").getTime() / 1000);
  const [seconds, setSeconds] = useState(props.time);
  const { dispatch } = props;

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => {
        if (seconds > 0) {
          return seconds - 1;
        } else {
          return "Poll end";
        }
      });
      // dispatch(counter(seconds));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const second = 1;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const textDay = Math.floor(seconds / day);
  const textHour = Math.floor((seconds % day) / hour);
  const textMinute = Math.floor((seconds % hour) / minute);
  const textSecond = Math.floor((seconds % minute) / second);

  return (
    <td>
      {!isNaN(textDay)
        ? `D: ${textDay} H: ${textHour} M: ${textMinute} S: ${textSecond}`
        : "No time remaining..."}
    </td>
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

export default connect(mapStateToProps)(Countdown);
