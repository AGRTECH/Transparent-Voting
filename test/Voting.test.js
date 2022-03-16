require("chai").use(require("chai-as-promised")).should();

const Voting = artifacts.require("./Voting");

contract("Voting", ([deployer, user1, user2, user3]) => {
  const EVM_REVERT = "VM Exception while processing transaction: revert";

  let voting;

  beforeEach(async () => {
    voting = await Voting.new();
  });
  describe("User can make a poll and choose a choice only within specified timeperiod", async () => {
    let result;
    beforeEach(async () => {
      result = await voting.createPoll("dogs", "corgi", "lab");
      await voting.vote("corgi", "dogs", { from: deployer });
      await voting.vote("corgi", "dogs", { from: user1 });
      await voting.vote("corgi", "dogs", { from: user2 });
    });
    it("Successfully creates a poll", async () => {
      const log = result.logs[0];
      assert.equal(log.event, "PollEvent");
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
  describe("Checks if the user has already voted", async () => {
    let result;
    beforeEach(async () => {
      await voting.createPoll("crypto", "bitcoin", "ethereum");
      await voting.createPoll("cats", "seimese", "fluffytail");
      await voting.vote("bitcoin", "crypto", { from: deployer });
    });
    it("should be rejected if user has voted once on a particular poll", async () => {
      await voting
        .vote("bitcoin", "crypto", { from: deployer })
        .should.be.rejectedWith(EVM_REVERT);
      await voting
        .vote("ethereum", "crypto", { from: deployer })
        .should.be.rejectedWith(EVM_REVERT);
      await voting.vote("fluffytail", "cats", { from: deployer });
      await voting
        .vote("seimese", "cats", { from: deployer })
        .should.be.rejectedWith(EVM_REVERT);
      let votesMappingFluff = await voting.votes("fluffytail");
      let votesMappingBtc = await voting.votes("bitcoin");
      let votesMappingEth = await voting.votes("ethereum");
      assert.equal(votesMappingFluff.toString(), "1");
      assert.equal(votesMappingBtc.toString(), "1");
      assert.equal(votesMappingEth.toString(), "0");
    });
  });
});
