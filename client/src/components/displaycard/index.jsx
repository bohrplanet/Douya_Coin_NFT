import React from 'react'
import { Card, Button, Image, Input, message } from 'antd';
import "./index.css"
import store from '../../redux/store'
import Market from "../../contracts/Market.json"
import DouyaNFT from "../../contracts/DouyaNFT.json"


export default function DisplayCard(props) {

    // console.log("props", props);

    const nft = props.nft;

    // console.log("nft is", nft);

    let x = React.useRef();

    async function buy_nft() {

        let webObj = store.getState();

        const { web3, accounts } = webObj;

        if (!accounts || accounts.length === 0) {
            return message.info('Connect wallet first please.');
        }

        // if (window.ethereum.chainId !== "0x3") {
        //     return message.info('Change network to Ropsten Test Network.');
        // }

        // 先去redux里面访问web3对象，如果不存在，那么就把值设置为connect wallet to watch
        // 如果有web3对象，那么就调用方法，把我的每个nft的属性值拿到，set给state
        // console.log("from redux at NFT page", webObj);
        // console.log("accounts", accounts[0]);

        if (accounts && accounts.length !== 0) {

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = DouyaNFT.networks[networkId];
            const contract = new web3.eth.Contract(
                DouyaNFT.abi,
                deployedNetwork && deployedNetwork.address,
            );

            // console.log("contract is ", contract);

            // 返回一个数组，每个数组中的值为拥有的nft的tokenid
            const count = await contract.methods.mintDouyaNFT().send({ from: accounts[0], value: 30000000000000000, gas: 1000000 }, function (error, result) {
                // console.log("result", result);
                // console.log("error", error);
            });

            // console.log("count is", count);

        }

        else {

        }
    }

    async function sell() {

        let webObj = store.getState();

        const { web3, accounts } = webObj;

        if (!accounts || accounts.length === 0) {
            return message.info('Connect wallet first please.');
        }

        // if (window.ethereum.chainId !== "0x3") {
        //     return message.info('Change network to Ropsten Test Network.');
        // }

        // 先去redux里面访问web3对象，如果不存在，那么就把值设置为connect wallet to watch
        // 如果有web3对象，那么就调用方法，把我的每个nft的属性值拿到，set给state
        // console.log("from redux at NFT page", webObj);
        // console.log("accounts", accounts[0]);

        if (accounts && accounts.length !== 0) {

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Market.networks[networkId];
            const contract = new web3.eth.Contract(
                Market.abi,
                deployedNetwork && deployedNetwork.address,
            );

            // console.log("contract is ", contract);

            await contract.methods.sale(nft.tokenId, web3.utils.toWei(x.current.input.value, 'ether')).send({ from: accounts[0], gas: 1000000 }, function (error, result) {
                // console.log("result", result);
                // console.log("error", error);
            });

        }

        else {

        }

    }

    async function cancel() {

        let webObj = store.getState();

        const { web3, accounts } = webObj;

        if (!accounts || accounts.length === 0) {
            return message.info('Connect wallet first please.');
        }

        // if (window.ethereum.chainId !== "0x3") {
        //     return message.info('Change network to Ropsten Test Network.');
        // }

        // 先去redux里面访问web3对象，如果不存在，那么就把值设置为connect wallet to watch
        // 如果有web3对象，那么就调用方法，把我的每个nft的属性值拿到，set给state
        // console.log("from redux at NFT page", webObj);
        // console.log("accounts", accounts[0]);

        if (accounts && accounts.length !== 0) {

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Market.networks[networkId];
            const contract = new web3.eth.Contract(
                Market.abi,
                deployedNetwork && deployedNetwork.address,
            );

            // console.log("contract is ", contract);

            await contract.methods.cancel(nft.tokenId).send({ from: accounts[0], gas: 1000000 }, function (error, result) {
                // console.log("result", result);
                // console.log("error", error);
            });

        }

        else {

        }

    }

    if (nft === 0) {
        return <Card className="buy_card" title="Buy NFT" bordered={true} style={{ width: 300, height: 400 }}>

            <Button className="button" type="primary" size="large" block="true" onClick={buy_nft}>Buy</Button>
        </Card>;
    } else {
        return <Card title={nft.id} bordered={true} style={{ width: 300, height: 400 }}>
            <Image
                src={nft.imageUri}
                preview={false}
                height={250}
                width={250}
            />
            <div className='power_div'>
                <span className='power_value'>Power: {nft.power}</span>
                <br />
                <Input ref={x} style={{ width: '100px' }} placeholder="sell price" />
                <Button type="primary" onClick={sell}>Sell</Button>
                <Button type="primary" onClick={cancel} danger> Cancel</Button>
            </div>
        </Card>
    }
}
