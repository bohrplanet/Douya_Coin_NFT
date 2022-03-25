import React from 'react'
import { Divider } from 'antd';
import "./index.css"
import store from '../../redux/store'
import DisplayCardForGame from '../displaycard_for_game';
import DouyaNFT from "../../contracts/DouyaNFT.json"

export default function Game(props) {


    const [myNFTs, setMyNFTs] = React.useState([])

    React.useEffect(() => {

        async function fetchData() {
            let webObj = store.getState();

            const { web3, accounts } = webObj;

            // 先去redux里面访问web3对象，如果不存在，那么就把值设置为connect wallet to watch
            // 如果有web3对象，那么就调用方法，把我的每个nft的属性值拿到，set给state
            // console.log("from redux at NFT page", webObj);
            // console.log("accounts", accounts[0]);

            const nfts = []

            // if (accounts && accounts.length !== 0 && window.ethereum.chainId === "0x3") {
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

                // const myNFTs = [];

                // 返回一个数组，每个数组中的值为拥有的nft的tokenid
                const count = await contract.methods.getByOwner(accounts[0]).call({ from: accounts[0], gas: 1000000 }, function (error, result) {
                    // console.log("count result", result);
                    // console.log("error", error);
                });

                // setMyNFTs([]);

                count.map(async (token, index) => {
                    // 通过每个tokenId，访问合约，拿到每个tokenId的图片链接，以及power值
                    const imageUri = await contract.methods.tokenURI(token).call({ from: accounts[0], gas: 1000000 }, function (error, result) {
                        // console.log("imageUri result", result);
                        // console.log("error", error);
                    });
                    // console.log("imageUri is", imageUri);

                    const power = await contract.methods.getPower(token).call({ from: accounts[0], gas: 1000000 }, function (error, result) {
                        // console.log("power result", result);
                        // console.log("error", error);
                    });
                    // console.log("power is", power);

                    let nftObj = {
                        imageUri: imageUri,
                        power: power,
                        tokenId: token
                    };

                    await nfts.push(nftObj);

                    // console.log("myNTFs is ", nfts);

                    await setMyNFTs(nfts);

                    // console.log("myNFTs", myNFTs);

                })


            }

            else {

            }
        }

        fetchData();

        // component will unmount
        return () => { }
    }, [])

    return (
        <div className='nft'>
            <h1 className='my_nft_title'>My NFTs:</h1>
            <Divider />
            <div className='nft_list'>
                {
                    myNFTs.map((nft, index) => {
                        return <DisplayCardForGame nft={nft} />
                    })
                }

                <DisplayCardForGame nft={0} />
            </div>

        </div>
    )
}
