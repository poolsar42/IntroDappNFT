## Creating DApp with NFT

### ERC-721 - protocol for NFT

- https://erc721.org
- https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC721
- https://ethereum.org/en/developers/docs/standards/tokens/erc-721/

### Contracts

- https://docs.openzeppelin.com/openzeppelin/

### Development Requirements (Stack)

- **Node.js**
- **Truffle.js** for use smart contracts in JS
- **Ganache** as local blockchain for developing reason
- **Web3.js** to connect frontend to blockchain
- **Mocha**, **chai** for testing
- **React**/**Redux**/**Drizzle** for frontend
- **Solidity** for contracts itself
- **MetaMask** - to be able to connect to Ethereum Network in Chrome

### Truffle Configuration
- https://www.trufflesuite.com/docs/truffle/reference/configuration
- https://gist.github.com/kdelwat/26d9049adbe6e165e8ba774e7034d231

### Migration

- every time contract changes - run \
  `truffle migrate --reset` it will post new contract on Ganache
- before checking fronted be sure to run in `truffle console` \
  `contract = Color.deployed()`
  Note: You can use your name instead of Color

### To listen on port 3000:

 - `npm i`
 - `npm run start`
