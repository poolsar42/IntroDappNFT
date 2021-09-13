## Creating DApp with NFT

### ERC-721 - protocol for NFT

- erc721.org
- https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC721

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
- https://www.trufflesuite.com/docs/truffle/reference/configuration

### Migration

- every time contract changes - run \
  `truffle migrate --reset` it will post new contract on Ganache
- before checking fronted be sure to run in `truffle console` \
  `contract = Color.deployed()`
  Note: You can use your name instead of Color

### To listen on port 3000:

 - `npm i`
 - `npm run start`
