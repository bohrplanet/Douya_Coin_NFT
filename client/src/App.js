import React, { Component } from "react";
import Douya from "./contracts/Douya.json";
import { Layout, Menu, Modal } from 'antd';
import { Link, Route, Routes, Navigate } from 'react-router-dom'
import 'antd/dist/antd.css'
import "./App.css";
import Home from './components/home'
import Buy from './components/buy'
import Nft from './components/nft'
import Game from './components/gaming'
import Market from "./components/market";
import Staking from "./components/staking";
import About from './components/about'
import Howtouse from "./components/howtouse"
import Web3 from "web3";
import store from './redux/store'


const { Header, Footer } = Layout;

class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    result: null,
    chainId: null,
    predictions: [],
    isModalVisible: false,
    setIsModalVisible: false,
    setIsModalVisible_network: false
  };

  componentDidMount = async () => {

    // Get network provider and web3 instance.
    // Modern dapp browsers...
    let web3 = null;

    if (window.ethereum) {

      window.ethereum.on('accountsChanged', async (accounts) => {

        // console.log("accountsChanged invoked!");

        // console.log("ready to reload!");

        window.location.reload();

      });

      window.ethereum.on('chainChanged', (chainId) => {

        // console.log("chainChanged!");
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        window.location.reload();
      });
    }

    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.send(
          "eth_requestAccounts"
        );

        // Accounts now exposed
      } catch (error) {
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // Use Mist/MetaMask's provider.
      web3 = window.web3;
      // console.log("Injected web3 detected.");
    }
    // Fallback to localhost; use dev console port by default...
    else {
      const provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:8545"
      );
      web3 = new Web3(provider);
      // console.log("No web3 instance injected, using Local web3.");
    }
    // console.log("getweb3", web3);

    this.setState({ web3 });

    if (!window.ethereum) {
      this.setState({ setIsModalVisible: true });

      // uncomment this line when deploy to ropsten network  
    } else if (window.ethereum.chainId !== "0x3") {
      // } else if (!web3) {

      this.setState({ setIsModalVisible_network: true });
    }

    if (web3) {
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Douya.networks[networkId];
      const instance = new web3.eth.Contract(
        Douya.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // console.log("accounts is", accounts);
      // console.log("networkId is", networkId);
      // console.log("deployedNetwork is", deployedNetwork);
      // console.log("instance is ", instance);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance, chainId: networkId }, this.getTopic);

      // console.log("connectWallet", web3);

      let web3Obj = {
        web3: web3,
        accounts: accounts,
        contract: instance
      }

      // ???????????????web3????????????????????????redux??????
      const action = { type: 'increment', data: web3Obj };

      store.dispatch(action);

    }

    // window.addEventListener("load", async () => {

    //   if (window.ethereum) {

    //     window.ethereum.on('accountsChanged', async (accounts) => {

    //       // console.log("accountsChanged invoked!");

    //       // console.log("ready to reload!");

    //       window.location.reload();

    //     });

    //     window.ethereum.on('chainChanged', (chainId) => {

    //       // console.log("chainChanged!");
    //       // Handle the new chain.
    //       // Correctly handling chain changes can be complicated.
    //       // We recommend reloading the page unless you have good reason not to.
    //       window.location.reload();
    //     });
    //   }

    // });

  };

  runExample = async () => {
    // const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // // Update state with the result.
    // this.setState({ storageValue: response });
  };

  connectToWallet = async () => {
    // Get network provider and web3 instance.
    // Modern dapp browsers...
    let web3 = null;
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.send(
          "eth_requestAccounts"
        );
        // Accounts now exposed
      } catch (error) {
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // Use Mist/MetaMask's provider.
      web3 = window.web3;
      // console.log("Injected web3 detected.");
    }
    // Fallback to localhost; use dev console port by default...
    else {
      const provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:8545"
      );
      web3 = new Web3(provider);
      // console.log("No web3 instance injected, using Local web3.");
    }
    // console.log("getweb3", web3);

    this.setState({ web3 });

    if (web3) {
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Douya.networks[networkId];
      const instance = new web3.eth.Contract(
        Douya.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // console.log("accounts is", accounts);
      // console.log("networkId is", networkId);
      // console.log("deployedNetwork is", deployedNetwork);
      // console.log("instance is ", instance);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance, chainId: networkId }, this.getTopic);

      // console.log("connectWallet", web3);

      let web3Obj = {
        web3: web3,
        accounts: accounts,
        contract: instance
      }

      // ???????????????web3????????????????????????redux??????
      const action = { type: 'increment', data: web3Obj };

      store.dispatch(action);

    }
  }

  handleOk = () => {
    // this.setState({ setIsModalVisible: false });
    window.open("https://metamask.io/");
  };

  handleCancel = () => {
    this.setState({ setIsModalVisible: false });
  };

  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    return (
      <div>
        <Modal title={<span style={{ fontSize: '18px', color: '#1890ff' }}> Connect to a wallet</span>} style={{ top: 300 }} visible={this.state.setIsModalVisible} onOk={this.handleOk} okText="Open MetaMask" onCancel={this.handleCancel}>
          <p style={{ fontSize: '16px', color: '#1890ff' }}>You'll need to install <b>MetaMask</b> to continue. Once you installed it, refresh the page please.</p>
        </Modal>

        <Modal title={<span style={{ fontSize: '18px', color: '#1890ff' }}> Connect wallet to Ropsten Network</span>} footer={null} style={{ top: 400 }} maskClosable={false} closable={false} visible={this.state.setIsModalVisible_network} >
          <p style={{ fontSize: '16px', color: '#1890ff' }}>You'll need to change network to Ropsten Test Network.</p>
        </Modal>

        <Layout className="layout">
          <Header>
            <div className="logo"><a href="/" style={{ color: '#f36b3b' }}><b>Douya</b></a></div>
            <Menu theme="dark" mode="horizontal">

              {/* ???????????? */}
              <Menu.Item key="1"><Link to="/home">Home</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/buy">Buy</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/nft">NFT</Link></Menu.Item>
              <Menu.Item key="4"><Link to="/game">Gaming</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/market">Market</Link></Menu.Item>
              <Menu.Item key="6"><Link to="/staking">Staking</Link></Menu.Item>
              <Menu.Item key="7"><Link to="/about">About Douya</Link></Menu.Item>
              <Menu.Item key="8" onClick={this.connectToWallet}>Connect</Menu.Item>
              <Menu.Item key="9"><Link to="/howtouse">How to use</Link></Menu.Item>
            </Menu>
          </Header>

          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/nft" element={<Nft />} />
            <Route path="/game" element={<Game />} />
            <Route path="/market" element={<Market />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/howtouse" element={<Howtouse />} />
          </Routes>

          <Footer style={{ textAlign: 'center' }}>Made with ??? by Bohr @2022 email: crypto18mo@gmail.com</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
