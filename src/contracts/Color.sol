pragma solidity ^0.8.0;

// if problem raised with ERC721 - it's because i do not use FULL
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

contract Color is ERC721 {
    string[] public colors;
    mapping(string => bool) _colorExists;

    constructor() ERC721("Color", "COLOR") {}

    // function for mint for solidity
    // now it's public, but I can change it
    function mint(string memory _color) public {
        // Require unique color
        require(!_colorExists[_color]); // color has to not exist
        // Color -  add it
        colors.push(_color);
        uint256 _id = colors.length;
        // Call the mint function
        _mint(msg.sender, _id);
        // Color - track it
        _colorExists[_color] = true;
    }

    // for now i'll just override this function
    // https://stackoverflow.com/questions/68810515/totalsupply-is-not-a-function-openzeppelin-contracts
    function totalSupply() external view returns (uint256) {
        return colors.length;
    }
}
