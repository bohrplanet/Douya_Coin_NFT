// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./Douya.sol";

contract DouyaNFT is AccessControl, ERC721Enumerable {
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter private _tokenIds;

    // import douya coin
    Douya private _douya;

    bool public _isSaleActive = false;
    bool public _revealed = false;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // Constants
    uint256 public constant MAX_SUPPLY = 50;
    uint256 public mintPrice = 0.03 ether;
    uint256 public maxBalance = 2;
    uint256 public maxMint = 1;

    string baseURI;
    string public notRevealedUri;
    string public baseExtension = ".png";

    struct Prop {
        uint16 power; // power
        uint256[] digTime; // mining timestamp
    }

    mapping(uint256 => Prop) public props;

    constructor(address douyacoin) ERC721("DouyaNFT", "DOUN") {
        _douya = Douya(douyacoin);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function tokenIds() public view returns (uint256) {
        return _tokenIds.current();
    }

    event Dig(bool successed, uint256 amount);

    function mintDouyaNFT()
        public
        payable
        onlyRole(MINTER_ROLE)
        returns (uint256)
    {
        require(
            totalSupply() + 1 <= MAX_SUPPLY,
            "Sale would exceed max supply"
        );
        require(_isSaleActive, "Sale must be active to mint DouyaMetas");
        require(
            balanceOf(msg.sender) + 1 <= maxBalance,
            "Sale would exceed max balance"
        );
        require(1 * mintPrice <= msg.value, "Not enough ether sent");
        require(1 <= maxMint, "Can only mint 1 tokens at a time");

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        if (totalSupply() < MAX_SUPPLY) {
            Prop memory i;
            i.power = uint16(rand());
            props[newItemId] = i;
            _mint(msg.sender, newItemId);
            // _setTokenURI(newItemId, tokenURI);
            return newItemId;
        }
        return 0;
    }

    function setBaseURI(string memory _newBaseURI)
        public
        onlyRole(MINTER_ROLE)
    {
        baseURI = _newBaseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyRole(MINTER_ROLE)
    {
        baseExtension = _newBaseExtension;
    }

    function setNotRevealedURI(string memory _notRevealedURI)
        public
        onlyRole(MINTER_ROLE)
    {
        notRevealedUri = _notRevealedURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (_revealed == false) {
            return notRevealedUri;
        }

        // string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return "0";
        }

        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return
            string(abi.encodePacked(base, tokenId.toString(), baseExtension));
    }

    function setRole(address addr) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, addr);
    }

    function setMoveNft(
        address owner,
        address addr,
        bool b
    ) public onlyRole(MINTER_ROLE) {
        _setApprovalForAll(owner, addr, b); //allow market contract transfer NFT
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function flipSaleActive() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _isSaleActive = !_isSaleActive;
    }

    function flipReveal() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _revealed = !_revealed;
    }

    function getByOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory result = new uint256[](balanceOf(_owner));
        uint256 counter = 0;
        for (uint256 i = 1; i <= _tokenIds.current(); i++) {
            if (ownerOf(i) == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function getPower(uint256 tokenId) public view returns (uint256) {
        return props[tokenId].power;
    }

    //mining operation
    function dig(address player, uint256 tokenId) public {
        require(ownerOf(tokenId) == player, "player and token not matched");
        require(digAlow(tokenId), "dig count not enough");
        props[tokenId].digTime.push(block.timestamp); // record mining timestamp

        // detemine how many douyacoin will be dig according to power value
        uint256 power = props[tokenId].power;

        uint256 random = (uint256(
            keccak256(abi.encodePacked(block.difficulty, block.timestamp))
        ) % 100) + 1;

        uint256 amount = power * random;

        _douya.mint(msg.sender, amount * 10**15);

        emit Dig(true, amount * 10**15);
    }

    // check allow to mining
    function digAlow(uint256 _tokenId) public view returns (bool) {
        // only can mining once in 24 hours
        uint256 start = block.timestamp - 86400;
        uint256 end = block.timestamp;
        uint256 counter = 0;
        for (uint256 i = 0; i < props[_tokenId].digTime.length; i++) {
            if (
                props[_tokenId].digTime[i] > start &&
                props[_tokenId].digTime[i] < end
            ) {
                counter++;
            }
        }
        if (counter >= 1) {
            return false;
        }
        return true;
    }

    // 1-100 random number
    function rand() public view returns (uint256) {
        uint256 random = uint256(
            keccak256(abi.encodePacked(block.difficulty, block.timestamp))
        );
        return (random % 100) + 1;
    }

    function withdraw(address to) public onlyRole(MINTER_ROLE) {
        uint256 balance = address(this).balance;
        payable(to).transfer(balance);
    }
}
