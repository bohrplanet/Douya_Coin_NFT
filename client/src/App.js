import React, { Component } from "react";
import Douya from "./contracts/Douya.json";
import getWeb3 from "./getWeb3";
import { Layout, Menu, Row, Col, Image } from 'antd';
import 'antd/dist/antd.css'
import "./App.css";
import big_pic from './img/big_pic.png'


const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
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
      this.setState({ web3, accounts, contract: instance }, this.runExample);
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

  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    return (
      <Layout className="layout">
        <Header>
          <div className="logo"><a href="/" style={{color: '#f36b3b'}}><b>Douya</b></a></div>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">Buy</Menu.Item>
            <Menu.Item key="2">NFT</Menu.Item>
            <Menu.Item key="3">Gaming</Menu.Item>
            <Menu.Item key="4">Staking</Menu.Item>
            <Menu.Item key="5">About Douya</Menu.Item>
            <Menu.Item key="6">Connect</Menu.Item>
          </Menu>
        </Header>






        <Content className="content" style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Row>
              <Col span={12} className="main_left">
                <h1 style={{ color: "#f36b3b"}}>Douya</h1>
                <h1 style={{ color: "#f36b3b"}}>MΞmΞ coin</h1>
              </Col>
              <Col span={12} className="main_right"> 
                <Image
                  src={big_pic}
                  preview={false}
                  height={900}
                  width={900}
                />
              </Col>
            </Row>
          </div>
        </Content>








        <Footer style={{ textAlign: 'center' }}>Made with ❤ by Bohr @2022 email: crypto18mo@gmail.com</Footer>
      </Layout>
    );
  }
}

export default App;
