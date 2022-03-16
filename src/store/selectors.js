import { get } from "lodash";
import { createSelector } from "reselect";

const web3 = (state) => get(state, "web3.connection");
export const web3Selector = createSelector(web3, (e) => e);

const account = (state) => get(state, "web3.account");
export const accountSelector = createSelector(account, (e) => e);

const accountLoaded = (state) => get(state, "web3.accountLoaded", false);
export const accountLoadedSelector = createSelector(accountLoaded, (e) => e);

const voting = (state) => get(state, "voting.contract");
export const votingSelector = createSelector(voting, (e) => e);

const votingLoaded = (state) => get(state, "voting.loaded", false);
export const votingLoadedSelector = createSelector(votingLoaded, (e) => e);

const category = (state) => get(state, "createPoll.category");
export const categorySelector = createSelector(category, (e) => e);

const canidateOne = (state) => get(state, "createPoll.canidateOne");
export const canidateOneSelector = createSelector(canidateOne, (e) => e);

const canidateTwo = (state) => get(state, "createPoll.canidateTwo");
export const canidateTwoSelector = createSelector(canidateTwo, (e) => e);

const pollCreated = (state) =>
  get(state, "createPoll.pollCreatedData.loaded", false);
export const pollCreatedSelector = createSelector(pollCreated, (e) => e);

const allPolls = (state) => get(state, "createPoll.pollCreatedData", []);
export const allPollsSelector = createSelector(allPolls, (e) => e);

const allPollsLoaded = (state) =>
  get(state, "createPoll.pollCreatedData.loaded", false);
export const allPollsLoadedSelector = createSelector(allPollsLoaded, (e) => e);

const allVotes = (state) => get(state, "createPoll.voteData.data", []);
export const allVotesSelector = createSelector(allVotes, (e) => e);

const allVotesLoaded = (state) =>
  get(state, "createPoll.voteData.loaded", false);
export const allVotesLoadedSelector = createSelector(allVotesLoaded, (e) => e);
