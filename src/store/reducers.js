import { combineReducers } from "redux";

function web3(state = {}, action) {
  switch (action.type) {
    case "WEB3_LOADED":
      return { ...state, connection: action.connection };
    case "WEB3_ACCOUNT_LOADED":
      return { ...state, account: action.account };
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
    case "POLL_CREATING":
      return { ...state, pollCreated: false };
    case "POLL_CREATED":
      data = {
        poll: action.pollData.poll,
        canidateOne: action.pollData.choice1,
        canidateTwo: action.pollData.choice2,
      };
      return {
        ...state,
        pollCreated: true,

        pollCreatedData: [
          {
            ...state.pollCreatedData.data,
            data,
          },
        ],
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
