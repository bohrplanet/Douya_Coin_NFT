import React from 'react'
import { Divider, Row, Col, Card, Input, Button } from 'antd';
import "./index.css"
import store from '../../redux/store'
import DisplayCard from '../displaycard';
import DouyaNFT from "../../contracts/DouyaNFT.json"

export default function Nft(props) {


    const [myNFTs, setMyNFTs] = React.useState([])

    React.useEffect(async () => {

        let webObj = store.getState();

        const { web3, accounts, contract } = webObj;

        // 先去redux里面访问web3对象，如果不存在，那么就把值设置为connect wallet to watch
        // 如果有web3对象，那么就调用方法，把我的每个nft的属性值拿到，set给state
        console.log("from redux at NFT page", webObj);
        // console.log("accounts", accounts[0]);

        if (webObj !== 0) {

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

            const count = await contract.methods.getByOwner(accounts[0]).call({ from: accounts[0], gas: 1000000 }, function (error, result) {
                console.log("result", result);
                console.log("error", error);
            });

            // contract.methods.balanceOf(accounts[0]).call({ from: accounts[0], gas: 1000000 }, function (error, result) {
            //     if (result !== douyacoin) {
            //         console.log("result", setDouyacoin(result));
            //         console.log("error", error);
            //     }
            // });

            // web3.eth.getBalance(accounts[0], function (error, result) {
            //     if (result !== eth) {
            //         console.log("result", setEth(result));
            //         console.log("error", error);
            //     }
            // });





        }

        else {

        }

        // component will unmount
        return () => { }
    }, [])

    return (
        <div className='nft'>
            <h1 className='my_nft'>My NFTs:</h1>
            <Divider />
            <div>
                {
                    myNFTs.map((nft, index) => {
                        return <DisplayCard nft={nft} />
                    })
                }
            </div>

        </div>
    )
}
