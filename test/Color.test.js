const { assert, expect } = require('chai')

const Color = artifacts.require('./Color.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

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
      console.log(result)
    })
  })
})
