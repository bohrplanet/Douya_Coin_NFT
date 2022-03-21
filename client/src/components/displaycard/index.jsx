import React from 'react'
import { Divider, Row, Col, Card, Input, Button, Image } from 'antd';
import "./index.css"
import store from '../../redux/store'

export default function DisplayCard(props) {

    const { nft } = props.nft;
    const [myNFTs, setMyNFTs] = React.useState([])

    return (
        <div className='card'>
            <Card title={nft.id} bordered={true} style={{ width: 300, height: 350 }}>
                <Image
                    src={nft.image}
                    preview={false}
                    height={300}
                    width={300}
                />
                <span>Power: {nft.power}</span>
                {/* <Button type="primary" onClick={sellOrCancel}>SellOrCancel</Button> */}
            </Card>
        </div>
    )
}
