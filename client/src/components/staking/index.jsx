import React from 'react'
import store from '../../redux/store'
import Market_contract from "../../contracts/Market.json"
import { Card, Input, Button } from 'antd';
import "./index.css"

export default function Staking(props) {


  const [myNFTs, setMyNFTs] = React.useState([])

  React.useEffect(async () => {

    let webObj = store.getState();

    const { web3, accounts, contract } = webObj;

    // 先去redux里面访问web3对象，如果不存在，那么就把值设置为connect wallet to watch
    // 如果有web3对象，那么就调用方法，把我的每个nft的属性值拿到，set给state
    console.log("from redux at NFT page", webObj);
    // console.log("accounts", accounts[0]);

    const nfts = []

    if (webObj !== 0) {

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Market_contract.networks[networkId];
      const contract = new web3.eth.Contract(
        Market_contract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      console.log("contract is ", contract);

      // 返回shop的数组
      const count = await contract.methods.getShop().call({ from: accounts[0], gas: 1000000 }, function (error, result) {
        console.log("count result", result);
        console.log("error", error);
      });

      console.log("shop count is ", count);


    }

    else {

    }

    // component will unmount
    return () => { }
  }, [])

  return (
    <div>
      <div className='staking_main'>
        <Card className='staking_left' bordered={false} style={{ width: 500 }}>
          <p>Staking Balance</p>
          <p>{ }DOU</p>
        </Card>
        <Card className='staking_right' bordered={false} style={{ width: 500 }}>
          <p>Reward Balance</p>
          <p>{ }DOU</p>
        </Card>
      </div>
      <div className='content'>
        <Card className='staking_content' style={{ width: 1000 }}>
          <p className='tokens'><span>Stake Tokens</span><span style={{ float: "right" }}>Blance:{ }</span></p>
          <Input className='stake_input' size='large' addonAfter="DOU" placeholder='Input DOU mount' />
          <Button className='stake_button' size='large' type='primary' block>STAKE!</Button>
          <Button className='stake_unstake' >UN-STAKE...</Button>
        </Card>
      </div>
    </div>
  )
}
