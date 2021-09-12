pragma solidity ^0.8.0;

// if problem raised with ERC721 - it's because i do not use FULL
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Color is ERC721 {
    constructor() ERC721("Color", "COLOR") {

    }
}
