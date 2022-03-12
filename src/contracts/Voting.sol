pragma solidity ^0.5.0;


contract Voting {

   uint public timePeriod = block.timestamp + 30 seconds;
   uint public timePeriodTest = block.timestamp + 40 seconds;
   string public choice1;
   string public choice2;
   string public poll;
   mapping(string => uint) public votes;
   // To Do List
   // [x] Users can create a new poll with 2 choices 
   // [x] User can vote on one of the choices 
   // [x] Set a voting time period
   // [x] At the end of the period, the one with more votes wins
   event PollEvent(
      string poll,
      string choice1,
      string choice2
   );

   function createPoll(string memory _poll, string memory _choice1, string memory _choice2) public {
      poll = _poll;
      choice1 = _choice1;
      choice2 = _choice2;
      emit PollEvent(_poll, _choice1, _choice2); 
   }

   function vote(string memory _choice) public {
      require(block.timestamp < timePeriod);
      votes[_choice] += 1;
   }
}