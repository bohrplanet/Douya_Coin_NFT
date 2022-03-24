import React from 'react'
import store from '../../redux/store'
import TokenBank from "../../contracts/TokenBank.json"
import Douya from "../../contracts/Douya.json"
import { Card, Input, Button } from 'antd';
import "./index.css"

export default function Staking(props) {

  let x = React.useRef()

  const [staking, setStaking] = React.useState(0)
  // const [reward, setReward] = React.useState(0)
  const [balance, setBalance] = React.useState(0)
  const [setLoading] = React.useState(true)


  React.useEffect(() => {

    async function fetchData() {
      let webObj = store.getState();

      const { web3, accounts } = webObj;
  
      // 先去redux里面访问web3对象，如果不存在，那么就把值设置为connect wallet to watch
      // 如果有web3对象，那么就调用方法，把我的每个nft的属性值拿到，set给state
      console.log("from redux at NFT page", webObj);
      // console.log("accounts", accounts[0]);
  
      if (accounts && accounts.length !== 0) {
  
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
  
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = TokenBank.networks[networkId];
        const contract = new web3.eth.Contract(
          TokenBank.abi,
          deployedNetwork && deployedNetwork.address,
        );
  
        const deployedNetwork_douya = Douya.networks[networkId];
        const contract_douya = new web3.eth.Contract(
          Douya.abi,
          deployedNetwork_douya && deployedNetwork_douya.address,
        );
  
        console.log("contract is ", contract);
  
        let stakingBalance = await contract.methods.stakingBalance(accounts[0]).call({ from: accounts[0], gas: 1000000 }, function (error, result) {
          console.log("stakingBalance result", result);
          console.log("error", error);
        });
  
        setStaking(stakingBalance);
  
        let douyaBalance = await contract_douya.methods.balanceOf(accounts[0]).call({ from: accounts[0], gas: 1000000 }, function (error, result) {
          console.log("stakingBalance result", result);
          console.log("error", error);
        });
  
        setBalance(douyaBalance);
  
      }
  
      else {
  
      }
    }

    fetchData();

    // component will unmount
    return () => { }
  }, [])

  async function stake() {

    let webObj = store.getState();

    const { web3, accounts } = webObj;

    // 先去redux里面访问web3对象，如果不存在，那么就把值设置为connect wallet to watch
    // 如果有web3对象，那么就调用方法，把我的每个nft的属性值拿到，set给state
    console.log("from redux at NFT page", webObj);
    // console.log("accounts", accounts[0]);

    if (accounts && accounts.length !== 0) {

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TokenBank.networks[networkId];
      const contract = new web3.eth.Contract(
        TokenBank.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const deployedNetwork_douya = Douya.networks[networkId];
      const contract_douya = new web3.eth.Contract(
        Douya.abi,
        deployedNetwork_douya && deployedNetwork_douya.address,
      );

      console.log("contract is ", contract);

      console.log("input value is ", x.current.input.value * (10 ** 18) + "");

      await contract_douya.methods.approve(contract._address, x.current.input.value * (10 ** 18) + "").send({ from: accounts[0], gas: 1000000 }, function (error, result) {
        console.log("result", result);
        console.log("error", error);
      });

      await contract.methods.stakeTokens(x.current.input.value * (10 ** 18) + "").send({ from: accounts[0], gas: 1000000 }).on('transactionHash', (hash) => {
        setLoading(false)
      })


      // contract_douya.methods.approve(contract.address, x.current.input.value * (10 ** 18) + "").send({ from: accounts[0], gas: 1000000 }).on('transactionHash', (hash) => {
      //   contract.methods.stakeTokens(x.current.input.value * (10 ** 18) + "").send({ from: accounts[0], gas: 1000000 }).on('transactionHash', (hash) => {
      //     setLoading(false)
      //   })
      // })

    }

    else {

    }


  }

  async function unstake() {

    let webObj = store.getState();

    const { web3, accounts } = webObj;

    // 先去redux里面访问web3对象，如果不存在，那么就把值设置为connect wallet to watch
    // 如果有web3对象，那么就调用方法，把我的每个nft的属性值拿到，set给state
    console.log("from redux at NFT page", webObj);
    // console.log("accounts", accounts[0]);

    if (accounts && accounts.length !== 0) {

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TokenBank.networks[networkId];
      const contract = new web3.eth.Contract(
        TokenBank.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const deployedNetwork_douya = Douya.networks[networkId];
      const contract_douya = new web3.eth.Contract(
        Douya.abi,
        deployedNetwork_douya && deployedNetwork_douya.address,
      );

      console.log("contract is ", contract);

      await contract.methods.unstakeTokens().send({ from: accounts[0], gas: 1000000 }).on('transactionHash', (hash) => {
        setLoading(false)
      })

      // contract_douya.methods.approve(contract.address, x.current.input.value * (10 ** 18) + "").send({ from: accounts[0], gas: 1000000 }).on('transactionHash', (hash) => {
      //   contract.methods.stakeTokens(x.current.input.value * (10 ** 18) + "").send({ from: accounts[0], gas: 1000000 }).on('transactionHash', (hash) => {
      //     setLoading(false)
      //   })
      // })

    }

    else {

    }

  }

  return (
    <div>
      <div className='staking_main'>
        <Card className='staking_left' bordered={false} style={{ width: 1000 }}>
          <p>Staking Balance</p>
          <p>{staking / (10 ** 18)} DOU</p>
        </Card>
        {/* <Card className='staking_right' bordered={false} style={{ width: 500 }}>
          <p>Reward Balance</p>
          <p>{ }DOU</p>
        </Card> */}
      </div>
      <div className='content'>
        <Card className='staking_content' style={{ width: 1000 }}>
          <p className='tokens'><span>Stake Tokens</span><span style={{ float: "right" }}>Balance: {balance / (10 ** 18)}</span></p>
          <Input className='stake_input' ref={x} size='large' addonAfter="DOU" placeholder='Input DOU mount' />
          <Button className='stake_button' size='large' type='primary' block onClick={stake}>STAKE!</Button>
          <Button className='stake_unstake' onClick={unstake}>UN-STAKE...</Button>
        </Card>
      </div>
    </div>
  )
}
