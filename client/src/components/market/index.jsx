import React from 'react'
import { Divider } from 'antd';
import "./index.css"
import store from '../../redux/store'
import DisplayCardForMarket from '../displaycard_for_market';
import DouyaNFT from "../../contracts/DouyaNFT.json"
import Market_contract from "../../contracts/Market.json"

export default function Market(props) {


    const [myNFTs, setMyNFTs] = React.useState([])

    React.useEffect(() => {

        async function fetchData() {
            let webObj = store.getState();

            const { web3, accounts } = webObj;
    
            // 先去redux里面访问web3对象，如果不存在，那么就把值设置为connect wallet to watch
            // 如果有web3对象，那么就调用方法，把我的每个nft的属性值拿到，set给state
            console.log("from redux at NFT page", webObj);
            // console.log("accounts", accounts[0]);
    
            const nfts = []
    
            if (accounts && accounts.length !== 0 && web3.eth.net.getId() === 3) {
    
                // Use web3 to get the user's accounts.
                const accounts = await web3.eth.getAccounts();
    
                // Get the contract instance.
                const networkId = await web3.eth.net.getId();
                const deployedNetwork = Market_contract.networks[networkId];
                const contract = new web3.eth.Contract(
                    Market_contract.abi,
                    deployedNetwork && deployedNetwork.address,
                );
    
                // Get the contract instance.
                const networkId_nft = await web3.eth.net.getId();
                const deployedNetwork_nft = DouyaNFT.networks[networkId_nft];
                const contract_nft = new web3.eth.Contract(
                    DouyaNFT.abi,
                    deployedNetwork_nft && deployedNetwork_nft.address,
                );
    
                console.log("contract is ", contract);
    
                // 返回shop的数组
                const count = await contract.methods.getShop().call({ from: accounts[0], gas: 1000000 }, function (error, result) {
                    console.log("count result", result);
                    console.log("error", error);
                });
    
                console.log("shop count is ", count);
    
                count.map(async (token, index) => {
    
                    if (token !== 0) {
                        console.log("token is", token);
                        // 通过每个tokenId，访问合约，拿到每个tokenId的图片链接，以及power值
                        const imageUri = await contract_nft.methods.tokenURI(token).call({ from: accounts[0], gas: 1000000 }, function (error, result) {
                            // console.log("imageUri result", result);
                            // console.log("error", error);
                        });
                        // console.log("imageUri is", imageUri);
    
                        const power = await contract_nft.methods.getPower(token).call({ from: accounts[0], gas: 1000000 }, function (error, result) {
                            // console.log("power result", result);
                            // console.log("error", error);
                        });
                        // console.log("power is", power);

                        const price = await contract.methods.getPrice(token).call({ from: accounts[0], gas: 1000000 }, function (error, result) {
                            console.log("count result", result);
                            console.log("error", error);
                        });
            
                        console.log("shop count is ", count);
    
                        let nftObj = {
                            imageUri: imageUri,
                            power: power,
                            tokenId: token,
                            price: price
                        };
    
                        await nfts.push(nftObj);
    
                        // console.log("myNTFs is ", nfts);
    
                        await setMyNFTs(nfts);
    
                        console.log("myNFTs", myNFTs);
                    }
    
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
            <h1 className='my_nft_title'>Market:</h1>
            <Divider />
            <div className='nft_list'>
                {
                    myNFTs.map((nft, index) => {
                        return <DisplayCardForMarket nft={nft} />
                    })
                }

                <DisplayCardForMarket nft={0} />
            </div>

        </div>
    )
}
