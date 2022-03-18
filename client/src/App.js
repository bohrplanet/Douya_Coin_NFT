import React, { Component } from "react";
import Douya from "./contracts/Douya.json";
import getWeb3 from "./getWeb3";
import { Layout, Menu } from 'antd';
import { Link, Route, Routes, Navigate } from 'react-router-dom'
import 'antd/dist/antd.css'
import "./App.css";
import Home from './components/home'
import Buy from './components/buy'


const { Header, Footer, Sider, Content } = Layout;

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
    try {
      // Get network provider and web3 instance.
      console.log("ddd");
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Douya.networks[networkId];
      const instance = new web3.eth.Contract(
        Douya.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({ web3, accounts, contract: instance, chainId: networkId });
      console.log("web3", this.state.web3);
      console.log("accounts", this.state.accounts);
      console.log("contract", this.state.contract);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // // Update state with the result.
    // this.setState({ storageValue: response });
  };

  // connectToWallet = async () => {
  //   // Get network provider and web3 instance.
  //   const web3 = await getWeb3();
  //   console.log("getweb3", web3);
  //   this.setState({ web3 });

  //   if (web3) {
  //     // Use web3 to get the user's accounts.
  //     const accounts = await web3.eth.getAccounts();

  //     // Get the contract instance.
  //     const networkId = await web3.eth.net.getId();
  //     const deployedNetwork = Douya.networks[networkId];
  //     const instance = new web3.eth.Contract(
  //       Douya.abi,
  //       deployedNetwork && deployedNetwork.address,
  //     );

  //     // console.log("accounts is", accounts);
  //     // console.log("networkId is", networkId);
  //     // console.log("deployedNetwork is", deployedNetwork);
  //     // console.log("instance is ", instance);

  //     // Set web3, accounts, and contract to the state, and then proceed with an
  //     // example of interacting with the contract's methods.
  //     this.setState({ web3, accounts, contract: instance, chainId: networkId }, this.getTopic);
  //   }
  // }

  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    return (
      <Layout className="layout">
        <Header>
          <div className="logo"><a href="/" style={{ color: '#f36b3b' }}><b>Douya</b></a></div>
          <Menu theme="dark" mode="horizontal">

            {/* 路由链接 */}
            <Menu.Item key="1"><Link to="/home">Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/buy">Buy</Link></Menu.Item>

            <Menu.Item key="3">NFT</Menu.Item>
            <Menu.Item key="4">Gaming</Menu.Item>
            <Menu.Item key="5">Staking</Menu.Item>
            <Menu.Item key="6">About Douya</Menu.Item>
            <Menu.Item key="7" onClick={this.connectToWallet}>Connect</Menu.Item>
          </Menu>
        </Header>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/buy" element={<Buy web3={this.state.web3} contract={this.state.contract} accounts={this.state.accounts}/>} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>

        <Footer style={{ textAlign: 'center' }}>Made with ❤ by Bohr @2022 email: crypto18mo@gmail.com</Footer>
      </Layout>
    );
  }
}

export default App;
