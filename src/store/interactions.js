import Voting from "../abis/Voting.json";
import {
  votingLoaded,
  pollCreated,
  web3Loaded,
  web3AccountLoaded,
  pollCreating,
  voteCasted,
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

export const subscribeToEvents = async (voting, dispatch, votingLoaded) => {
  voting.events.PollEvent({}, (error, event) => {
    dispatch(pollCreated(event.returnValues));
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

export const voteFunc = (dispatch, voting, account, choice) => {
  voting.methods
    .vote(choice)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      dispatch(voteCasted());
    })
    .on("error", (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};
