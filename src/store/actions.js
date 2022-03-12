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

export function voteCasted() {
  return {
    type: "VOTE_CASTED",
  };
}
