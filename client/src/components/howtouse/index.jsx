import React from 'react'
import "./index.css"

export default function About(props) {

    return (
        <div className='howto'>
            <ol>
                <li>Deposit ETH: to get Douya Coin, at Buy page, input amount, then press Submit, wait around 1 min, let blockchain confirm.</li>
                <li>Withdraw ETH: The same as above</li>
                <li>Buy NFT: at NFT page, press Buy button, confirm at Metamask page, wait around 1 min, let blockchain confirm.</li>
                <li>Sell/Cancel NFT: set sale price, then press Sale button, you can also cancel the sale.</li>
                <li>Dig the grass, earn Douya Coin: you can use NFT to dig, earn Douya Coin, 1 time every 24 hours.</li>
                <li>Trade NFT at NFT market page.</li>
                <li>Staking your Douya Coin, reward Douya coin when staking.</li>
            </ol>
        </div>
    )
}
