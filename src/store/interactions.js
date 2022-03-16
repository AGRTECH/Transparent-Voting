import Voting from "../abis/Voting.json";
import {
  votingLoaded,
  pollCreated,
  web3Loaded,
  web3AccountLoaded,
  pollCreating,
  voteCasted,
  allPollsLoaded,
  voteCasting,
  allVotesLoaded,
} from "./actions";
import Web3 from "web3";

export const loadWeb3 = (dispatch) => {
  const web3 = new Web3(window.ethereum);
  dispatch(web3Loaded(web3));
  return web3;
};

export const loadAccount = async (web3, dispatch) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  dispatch(web3AccountLoaded(account));
  return account;
};

export const loadVoting = async (web3, networkId, dispatch) => {
  try {
    const voting = new web3.eth.Contract(
      Voting.abi,
      Voting.networks[networkId].address
    );
    dispatch(votingLoaded(voting));
    return voting;
  } catch (error) {
    console.log(
      "Contract not deployed to the current network, Please select another network with Metamask"
    );
    return null;
  }
};

export const loadAllData = async (voting, dispatch) => {
  // Fetch polls with the 'Poll' event stream
  const pollStream = await voting.getPastEvents("PollEvent", {
    fromBlock: 0,
    toBlock: "latest",
  });
  // Format polls
  const allPolls = pollStream.map((event) => event.returnValues);
  // Add polls to the redux store
  dispatch(allPollsLoaded(allPolls));

  // Fetch votes with the 'vote' event stream
  const voteStream = await voting.getPastEvents("VoteEvent", {
    fromBlock: 0,
    toBlock: "latest",
  });
  // Format votes
  const allVotes = voteStream.map((event) => event.returnValues);
  // Add votes to the redux store
  dispatch(allVotesLoaded(allVotes));
};

export const subscribeToEvents = async (voting, dispatch) => {
  voting.events.PollEvent({}, (error, event) => {
    dispatch(pollCreated(event.returnValues));
  });

  voting.events.VoteEvent({}, (error, event) => {
    dispatch(voteCasted(event.returnValues));
  });
};

export const createPollFunc = (
  dispatch,
  voting,
  account,
  category,
  canidateOne,
  canidateTwo
) => {
  voting.methods
    .createPoll(category, canidateOne, canidateTwo)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      dispatch(pollCreating());
    })
    .on("error", (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};

export const voteFunc = (dispatch, voting, account, choice, poll, id) => {
  voting.methods
    .vote(choice, poll, id)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      dispatch(voteCasting());
    })
    .on("error", (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};
