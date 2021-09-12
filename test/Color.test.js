const { assert } = require('chai')

const Color = artifacts.require('./Color.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()
// this accounts passed in by ganache
contract('Color', (accounts) => {

  let contract

  beforeEach(async () => {
    contract = await Color.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address
      assert.notEqual(address, '')
      assert.notEqual(address, 0x0) // empty address
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await contract.name()
      assert.equal(name, 'Color')
    })

    it('has a symbol', async () => {
      const symbol = await contract.symbol()
      assert.equal(symbol, 'COLOR')
    })
  })

  describe('minting', async () => {
    it('creates a new token', async () => {
      const result = await contract.mint('#EC085F')
      const totalSupply = await contract.totalSupply()

      // SUCCESS

      assert.equal(totalSupply, 1)
      // it mints to the first address in Ganache
      const event = result.logs[0].args
      assert.equal(event.tokenId.toNumber(), totalSupply.toNumber(), 'id is correct')
      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
      assert.equal(event.to, accounts[0], 'to is correct')

      // FAILURE

      await contract.mint('#EC085F').should.be.rejected;
    })
  })

  describe('indexing', async () => {
    it('losts colors', async () => {
      // Mint 3 more tokens
      await contract.mint('#EC065F')
      await contract.mint('#FFFFFF')
      await contract.mint('#000000')
      const totalSupply = await contract.totalSupply();

      let color, result = []

      for (let i = 0; i < totalSupply; ++i) {
        color = await contract.colors(i)
        result.push(color)
      }
      // The first color here from previous "describe"
      let expected = ['#EC085F', '#EC065F', '#FFFFFF', '#000000'];
      assert.equal(result.join(','), expected.join(','))
    })
  })
})
