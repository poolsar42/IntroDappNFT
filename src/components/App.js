import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Color from '../abis/Color.json'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accounts: [],
      account: '',
      contract: null,
      totalSupply: 0,
      colors: []
    }
  }


  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.Web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. Try MetaMask')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const networkId = await web3.eth.net.getId()
    const networkData = Color.networks[networkId]
    if (networkData) {
      const abi = Color.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      // call method to fetch data from blockchain
      const totalSupply = await contract.methods.totalSupply().call()
      // fetch colors and add it to state
      for (let i = 0; i < totalSupply; ++i) {
        let color = await contract.methods.colors(i).call()
        this.setState({ colors: [...this.state.colors, color] })
      }
      this.setState({ contract, totalSupply, })

      // const colors = await contract.
    } else {
      window.alert('this smart contract is not deployed to this network')
    }

    // Load account
    const accounts = await web3.eth.getAccounts() // get an accounts from web3

    this.setState({
      accounts,
      account: accounts[0] || '',
    })
  }

  mint = async (color) => {
    // send method to add data to blockchain
    // mint is method from my smart-contract
    await this.state.contract.methods.mint(color).send({
      from: this.state.account // always needed from
    }).once('receipt', (receipt) => {
      this.setState({colors: [...this.state.colors, color]})
    })
  }

  // all lines above - loading blockhain data to the dom

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Color NFTs
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Issue Token</h1>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const color = this.color.value
                  this.mint(color)
                }}>
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="for example #FFFFFF"
                    ref={(input) => { this.color = input }} //? weeb shit
                  />
                  <button
                    type="submit"
                    className="btn btn-block btn-primary"
                    value="MINT">
                    Create new color-NFT
                  </button>
                </form>
              </div>
            </main>
          </div>
          <hr />
          <div className="row text-center">
            {this.state.colors.map((color, id) => {
              return (
                <div key={id} className="col-md-3 mb-0">
                  <div className="token" style={{ backgroundColor: color }}></div>
                  <div>
                    {color}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
