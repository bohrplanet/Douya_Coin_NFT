import React from 'react'
import { Card, Button, Image } from 'antd';
import "./index.css"
import store from '../../redux/store'
import DouyaNFT from "../../contracts/DouyaNFT.json"


export default function DisplayCardForGame(props) {

    console.log("props", props);

    const nft = props.nft;

    console.log("nft is", nft);

    async function dig() {

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
            const deployedNetwork = DouyaNFT.networks[networkId];
            const contract = new web3.eth.Contract(
                DouyaNFT.abi,
                deployedNetwork && deployedNetwork.address,
            );

            console.log("contract is ", contract);

            // dig 方法
            const count = await contract.methods.dig(accounts[0], nft.tokenId).send({ from: accounts[0], gas: 1000000 }, function (error, result) {
                console.log("result", result);
                console.log("error", error);
            });

            console.log("count is", count);

        }

        else {

        }
    }

    if (nft === 0) {
        return <div />;
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
                <Button type="primary" onClick={dig}>Dig</Button>
            </div>
        </Card>
    }
}
