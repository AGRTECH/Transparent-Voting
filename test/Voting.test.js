require("chai").use(require("chai-as-promised")).should();

const Voting = artifacts.require("./Voting");

contract("Voting", () => {
  let voting;

  beforeEach(async () => {
    voting = await Voting.new();
  });
  describe("User can make a poll and choose a choice only within specified timeperiod", async () => {
    let result;
    beforeEach(async () => {
      result = await voting.createPoll("dogs", "corgi", "lab");
      await voting.vote("corgi");
      await voting.vote("corgi");
      await voting.vote("corgi");
    });
    it("Successfully creates a poll", async () => {
      const log = result.logs[0];
      assert.equal(log.event, "PollEvent");
      // const event = log.args;
      // assert.equal(event.token, token.address, "token address is correct");
      // assert.equal(event.user, user1, "user address is correct");
    });
    it("Increases vote count", async () => {
      let votesMapping = await voting.votes("corgi");
      assert.equal(votesMapping.toString(), "3");
    });
  });
  describe("Maps all created polls", async () => {
    let result;
    beforeEach(async () => {
      result = await voting.createPoll("dogs", "corgi", "lab");
      await voting.createPoll("cats", "seiemese", "cookie");
      await voting.createPoll("crypto", "btc", "eth");
    });
    it("Maps polls", async () => {
      let pollOne = await voting.polls("1");
      let pollTwo = await voting.polls("2");
      let pollThree = await voting.polls("3");
      assert.equal(pollOne.choice1, "corgi");
      assert.equal(pollTwo.poll, "cats");
      assert.equal(pollThree.id.toString(), "3");
    });
  });
});
