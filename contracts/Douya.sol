// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Douya is ERC20, AccessControl {

    // 将字符串转成byte32
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() ERC20("Douya", "DOU") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _mint(msg.sender, 100000000 * 10**decimals());
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function burn(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _burn(to, amount);
    }

    function transferRole(address sender, address receiver, uint256 amount) public onlyRole(MINTER_ROLE) {
        _transfer(sender, receiver, amount);
    }

    function setRole(address addr) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, addr);
    }

    // 兑换(合约收取eth后铸造代币给用户)
    function exchange() payable public {
        uint256 amountTobuy = msg.value;
        require(amountTobuy > 0, "You need to send some Ether");
        _mint(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    // 合约拥有者提取eth
    function withdrawOwner(uint256 amount) public onlyRole(DEFAULT_ADMIN_ROLE) {
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

    uint256 public rate = 1000000;

    uint256 public charge=0;

    function withdraw(uint256 amount) public {
        _burn(msg.sender, amount);
        payable(msg.sender).transfer(amount*rate/1000000-amount*rate/1000000*charge/100);
        emit Sold(amount);
    }

    function transferOther(address receiver, uint256 amount) public {
        transferFrom(msg.sender, receiver, amount);
    }

    function setRate(uint256 _rate) public onlyRole(DEFAULT_ADMIN_ROLE) {
        rate = _rate;
    }

    function setCharge(uint256 _charge) public onlyRole(DEFAULT_ADMIN_ROLE) {
        charge = _charge;
    }
}
