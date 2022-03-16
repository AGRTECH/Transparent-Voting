pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

// To Do List
   // [x] Users can create a new poll with 2 choices 
   // [x] User can vote on one of the choices 
   // [x] Set a voting time period (JS)
   // [x] At the end of the period, the one with more votes wins (JS)

contract Voting {
   using SafeMath for uint;

   // Variables and Mappings
   uint256 public pollCount;
   uint256 public voteId;
   mapping(uint256 => _Poll) public polls;
   mapping(uint256 => mapping(string => uint)) public votesPerChoicePerPoll;
   mapping(uint256 => mapping(address => bool)) public hasVotedOnPoll;
   
   // Events and Structs
   event PollEvent(
      uint256 id,
      address user,
      string poll,
      string choice1,
      string choice2,
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

   event VoteEvent(
      uint256 voteId,
      uint256 pollId,
      address user,
      string poll,
      string choice,
      uint voteCount,
      uint256 timestamp
   );
   


   // Creates a poll with user inputed category type and two choices, poll gets stored in the event stream
   function createPoll(string memory _poll, string memory _choice1, string memory _choice2) public {

      // pollCount is used as a unique ID for each poll and when this function is called it creates a new ID
      pollCount = pollCount.add(1);

      // Adds the unique poll to the polls mapping
      polls[pollCount] = _Poll(pollCount, msg.sender, _poll, _choice1, _choice2, now);

      // Emit PollEvent
      emit PollEvent(pollCount, msg.sender, _poll, _choice1, _choice2, now); 
   }

   // User casts a vote by clicking a button on the UI and the vote gets stored in the event stream
   function vote(string memory _choice, string memory _poll, uint256 _id) public {

      // requires that the user has not already voted once on a particular poll
      require(hasVotedOnPoll[_id][msg.sender] != true);
      // Counts number of total votes
      voteId = voteId.add(1);

      // Voter has now voted on the poll and cannot vote on it again
      hasVotedOnPoll[_id][msg.sender] = true;

      // Counts votes for each choice of a specific poll
      votesPerChoicePerPoll[_id][_choice] = votesPerChoicePerPoll[_id][_choice].add(1);

      // Emit VoteEvent
      emit VoteEvent(voteId, _id, msg.sender, _poll, _choice, votesPerChoicePerPoll[_id][_choice], now);
   }
}