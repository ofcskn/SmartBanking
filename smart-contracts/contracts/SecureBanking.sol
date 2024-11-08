// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SecureBanking {
    address public owner;

    // Mapping to keep track of user balances
    mapping(address => uint256) private balances;

    // Event declarations for logging actions
    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    constructor() payable {
        require(msg.value > 0, "Initial deposit must be greater than zero.");
        owner = msg.sender;
        emit Deposited(msg.sender, msg.value); // Emit event for initial deposit
    }

    // Function to deposit funds into the bank
    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero.");
        balances[msg.sender] += msg.value; // Update the balance
        emit Deposited(msg.sender, msg.value); // Emit deposit event
    }

    // Function to withdraw funds from the bank
    function withdraw(uint256 amount) public {
        require(amount > 0, "Withdrawal amount must be greater than zero.");
        require(balances[msg.sender] >= amount, "Insufficient balance."); // Check balance
        balances[msg.sender] -= amount; // Update the balance
        payable(msg.sender).transfer(amount); // Transfer the amount to the user
        emit Withdrawn(msg.sender, amount); // Emit withdrawal event
    }

    // Function to get the balance of the caller
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    // Function to deposit ether to the contract
    receive() external payable {}
}
