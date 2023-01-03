// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";

// To Do List
   // [x] Users can create a new poll with 2 choices 
   // [x] User can vote on one of the choices 
   // [x] Set a voting time period (JS)
   // [x] At the end of the period, the one with more votes wins (JS)
   // [] If the user guesses the right canidate, they win tokens
   // [] Owner able to remove results

contract Voting is ReentrancyGuard {
   using SafeMath for uint;

   // Variables and Mappings
   uint256 public pollCount;
   uint256 public voteId;
   // address public owner;
   mapping(uint256 => _Poll) public polls;
   mapping(uint256 => mapping(string => uint)) public votesPerChoicePerPoll;
   mapping(uint256 => mapping(address => bool)) public hasVotedOnPoll;
   mapping(address => uint) public totalVotes;
   mapping(address => uint) public totalPollsCreated;
   
//    constructor() public {
//     owner = msg.sender;
//   }

   // Events and Structs
   event PollEvent(
      uint256 id,
      address user,
      string poll,
      string choice1,
      string choice2,
      uint256 timestamp
   );

    event VoteEvent(
      uint256 voteId,
      uint256 pollId,
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

  
   

    /** 
  * @notice Creates a poll with user inputed category type and two choices
  * @param _poll The name of the poll
  * @param _choice1 The name of the first canidate
  * @param _choice2 The name of the second canidate
  */
  
   function createPoll(string memory _poll, string memory _choice1, string memory _choice2) public nonReentrant {

      // pollCount is used as a unique ID for each poll and when this function is called it creates a new ID
      pollCount = pollCount.add(1);

      totalPollsCreated[msg.sender] = totalPollsCreated[msg.sender].add(1);


      // Adds the unique poll to the polls mapping
      polls[pollCount] = _Poll(pollCount, msg.sender, _poll, _choice1, _choice2, now);

      // Emit PollEvent
      emit PollEvent(pollCount, msg.sender, _poll, _choice1, _choice2, now); 
   }

     /** 
  * @notice Casts a vote on a created poll
  * @dev Throws if the address has already voted on a speific catergory
  * @param _choice The canidate chosen to vote on
  * @param _poll The poll being voted on
  * @param _id The poll id to create guarenteed individuallity between polls
  */

   function vote(string memory _choice, string memory _poll, uint256 _id) public nonReentrant {

      // requires that the user has not already voted once on a particular poll
      require(hasVotedOnPoll[_id][msg.sender] != true);
      // Counts number of total votes
      voteId = voteId.add(1);

      // Voter has now voted on the poll and cannot vote on it again
      hasVotedOnPoll[_id][msg.sender] = true;

      totalVotes[msg.sender] = totalVotes[msg.sender].add(1);


      // Counts votes for each choice of a specific poll
      votesPerChoicePerPoll[_id][_choice] = votesPerChoicePerPoll[_id][_choice].add(1);

      // Emit VoteEvent
      emit VoteEvent(voteId, _id, msg.sender, _poll, _choice, votesPerChoicePerPoll[_id][_choice], now);
   }

   // function claimWinnings(uint _winnings) public nonReentrant {


   //    tvote.transfer(msg.sender, _winnings);
   // }

   // function removeResult(uint256 _id) onlyOwner {

   // }
}