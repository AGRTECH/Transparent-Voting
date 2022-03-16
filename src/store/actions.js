export function web3Loaded(connection) {
  return {
    type: "WEB3_LOADED",
    connection,
  };
}

export function web3AccountLoaded(account) {
  return {
    type: "WEB3_ACCOUNT_LOADED",
    account,
  };
}

export function votingLoaded(contract) {
  return {
    type: "VOTING_LOADED",
    contract,
  };
}

export function categoryChanged(data) {
  return {
    type: "CATEGORY_CHANGED",
    data,
  };
}
export function canidateOneChanged(data) {
  return {
    type: "CANIDATE_ONE_CHANGED",
    data,
  };
}
export function canidateTwoChanged(data) {
  return {
    type: "CANIDATE_TWO_CHANGED",
    data,
  };
}

export function pollCreating() {
  return {
    type: "POLL_CREATING",
  };
}

export function pollCreated(pollData) {
  return {
    type: "POLL_CREATED",
    pollData,
  };
}

export function voteCasted(voteData) {
  return {
    type: "VOTE_CASTED",
    voteData,
  };
}

export function voteCasting() {
  return {
    type: "VOTE_CASTING",
  };
}

export function allPollsLoaded(allPolls) {
  return {
    type: "ALL_POLLS_LOADED",
    allPolls,
  };
}

export function allVotesLoaded(allVotes) {
  return {
    type: "ALL_VOTES_LOADED",
    allVotes,
  };
}

export function counter(time) {
  return {
    type: "COUNTING",
    time,
  };
}

export function saveLastCount(seconds) {
  return {
    type: "SAVE_LAST_COUNT",
    seconds,
  };
}
