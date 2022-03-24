// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Douya.sol";

contract TokenBank {
    address public owner;
    Douya public douya;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(address _douya) {
        douya = Douya(_douya);
        owner = msg.sender;
    }

    function stakeTokens(uint256 _amount) public {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Trasnfer Mock Dai tokens to this contract for staking
        douya.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        // 这里要防止溢出，所以加之后必须检查，需要加之后的前必须大于之前的
        require(
            stakingBalance[msg.sender] + _amount > stakingBalance[msg.sender],
            "new value is smaller than before."
        );
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Add user to stakers array *only* if they haven't staked already
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstaking Tokens (Withdraw)
    function unstakeTokens() public {
        // Fetch staking balance
        uint256 balance = stakingBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");

        // Transfer Mock Dai tokens to this contract for staking
        douya.transfer(msg.sender, balance);

        // Reset staking balance
        stakingBalance[msg.sender] = 0;

        // Update staking status
        isStaking[msg.sender] = false;
    }

    // Issuing Tokens
    function issueTokens() public {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // Issue tokens to all stakers
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient];
            if (balance > 0) {
                douya.transfer(recipient, balance / 10);
            }
        }
    }
}
