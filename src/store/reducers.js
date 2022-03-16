import { combineReducers } from "redux";

function web3(state = {}, action) {
  switch (action.type) {
    case "WEB3_LOADED":
      return { ...state, connection: action.connection };
    case "WEB3_ACCOUNT_LOADED":
      return { ...state, accountLoaded: true, account: action.account };
    default:
      return state;
  }
}

function voting(state = {}, action) {
  switch (action.type) {
    case "VOTING_LOADED":
      return { ...state, loaded: true, contract: action.contract };
    case "VOTING_CASTED":
      return { ...state, contract: action.contract };
    default:
      return state;
  }
}

function createPoll(state = {}, action) {
  let data = {};
  switch (action.type) {
    case "CATEGORY_CHANGED":
      return { ...state, category: action.data };
    case "CANIDATE_ONE_CHANGED":
      return { ...state, canidateOne: action.data };
    case "CANIDATE_TWO_CHANGED":
      return { ...state, canidateTwo: action.data };
    case "ALL_POLLS_LOADED":
      return {
        ...state,
        pollCreatedData: { loaded: true, data: action.allPolls },
      };
    case "ALL_VOTES_LOADED":
      return {
        ...state,
        voteData: { loaded: true, data: action.allVotes },
      };
    case "POLL_CREATING":
      return { ...state, pollCreated: false };
    case "VOTE_CASTING":
      return { ...state, voteCasted: false };
    case "POLL_CREATED":
      if (state.pollCreatedData) {
        data = [...state.pollCreatedData.data, action.pollData];
        console.log("top", data.length);
      } else {
        data = [action.pollData];
        console.log("bot", data.length);
      }

      return {
        ...state,
        pollCreated: true,

        pollCreatedData: {
          ...state.pollCreatedData,
          data,
        },
      };
    case "VOTE_CASTED":
      if (state.voteData.data) {
        data = [...state.voteData.data, action.voteData];
        console.log("top", data.length);
      } else {
        data = [action.voteData];
        console.log("bot", data.length);
      }

      return {
        ...state,
        voteCasted: true,

        voteData: {
          ...state.voteData,
          data,
        },
      };
    case "COUNTING":
      return {
        ...state,
        time: action.time,
      };
    case "SAVE_LAST_COUNT":
      let editedTimestamps = [];
      for (let i = 0; i < action.seconds.length; i++) {
        editedTimestamps.push(action.seconds[i]--);
      }
      return {
        ...state,
        time: editedTimestamps,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  web3,
  voting,
  createPoll,
});

export default rootReducer;
