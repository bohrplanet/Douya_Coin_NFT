import React from 'react'
import { Divider, Row, Col, Card, Input, Button, Image } from 'antd';
import "./index.css"
import store from '../../redux/store'

export default function DisplayCard(props) {

    console.log("props", props);

    const nft = props.nft;

    console.log("nft is", nft);

    if (nft == 0) {
        return <Card className="buy_card" title="Buy NFT" bordered={true} style={{ width: 300, height: 350 }}>

            <Button className="button" type="primary" size="large" block="true">Buy</Button>
        </Card>;
    } else {
        return <Card title={nft.id} bordered={true} style={{ width: 300, height: 350 }}>
            <Image
                src={nft.image}
                preview={false}
                height={300}
                width={300}
            />
            <span>Power: {nft.power}</span>
            {/* <Button type="primary" onClick={sellOrCancel}>SellOrCancel</Button> */}
        </Card>
    }
}
