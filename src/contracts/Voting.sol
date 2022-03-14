pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Voting {
   using SafeMath for uint;

   uint public timePeriod = block.timestamp + 30 seconds;
   uint public timePeriodTest = block.timestamp + 40 seconds;
   string public choice1;
   string public choice2;
   string public poll;
   uint256 public pollCount;
   uint256 public voteCount;
   uint256 public voteId;
   mapping(string => uint) public votes;
   mapping(uint256 => _Poll) public polls;
   // To Do List
   // [x] Users can create a new poll with 2 choices 
   // [x] User can vote on one of the choices 
   // [x] Set a voting time period
   // [x] At the end of the period, the one with more votes wins
   event PollEvent(
      uint256 id,
      address user,
      string poll,
      string choice1,
      string choice2,
      uint256 timestamp
   );

   event VoteEvent(
      uint256 id,
      address user,
      string poll,
      string choice,
      uint voteCount,
      uint256 timestamp
   );

   struct _Poll {
    uint256 id;
    address user;
    string poll;
    string choice1;
    string choice2;
    uint256 timestamp;
  }

   function createPoll(string memory _poll, string memory _choice1, string memory _choice2) public {
      pollCount = pollCount.add(1);
      polls[pollCount] = _Poll(pollCount, msg.sender, _poll, _choice1, _choice2, now);
      poll = _poll;
      choice1 = _choice1;
      choice2 = _choice2;
      emit PollEvent(pollCount, msg.sender, _poll, _choice1, _choice2, now); 
   }

   function vote(string memory _choice, string memory _poll) public {
      // require(block.timestamp < timePeriod);
      voteId = voteId.add(1);
      votes[_choice] += 1;
      emit VoteEvent(voteId, msg.sender, _poll, _choice, votes[_choice], now);
   }
}