// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Douya.sol";
import "./DouyaNFT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Market is Ownable{
    using SafeMath for uint256;
    
    Douya private _douya;

    DouyaNFT private _douyaNFT;

    constructor(address douyacoinAddr,address douyaNFTAddr){
        _douya=Douya(douyacoinAddr);
        _douyaNFT=DouyaNFT(douyaNFTAddr);
    }
    
    struct Sales{
        address seller;
        uint price;
    }
    mapping(uint=>Sales) public shop;
    uint shopCount;
    uint public minPrice = 1*10**18;

    event Sale(uint indexed tokenId,address indexed seller);
    event Cancel(uint indexed tokenId,address indexed seller);
    event Buy(uint indexed tokenId,address indexed buyer,address indexed seller);

    function sale(uint _tokenId,uint _price)public{
        require(_price>=minPrice,'Your price not alow');
        require(_douyaNFT.ownerOf(_tokenId)==msg.sender,"token not alow");
        shop[_tokenId] = Sales(msg.sender,_price);
        shopCount = shopCount.add(1);
        _douyaNFT.setMoveNft(msg.sender,address(this),true);
        emit Sale(_tokenId,msg.sender);
    }

    function cancel(uint _tokenId)public{
        require(_douyaNFT.ownerOf(_tokenId)==msg.sender,"token not alow");
        delete shop[_tokenId];
        _douyaNFT.setMoveNft(msg.sender,address(this),false);
        shopCount = shopCount.sub(1);
        emit Cancel(_tokenId,msg.sender);
    }

    function buy(uint _tokenId)public{
        require(_douya.balanceOf(msg.sender) >= shop[_tokenId].price,'No enough money');
        _douya.transferRole(msg.sender,shop[_tokenId].seller,shop[_tokenId].price);//contract transfer money to seller
        _douyaNFT.safeTransferFrom(shop[_tokenId].seller,msg.sender,_tokenId);//contract transfer NFT from seller to buyer
        delete shop[_tokenId];
        shopCount = shopCount.sub(1);
        emit Buy(_tokenId,msg.sender,shop[_tokenId].seller);
    }

    function getShop() external view returns(uint[] memory) {
        uint[] memory result = new uint[](shopCount);
        uint counter = 0;
        for (uint i = 1; i <= _douyaNFT.tokenIds(); i++) {
            if (shop[i].price != 0) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function setMinPrice(uint _value)public onlyOwner{
        minPrice = _value;
    }
}