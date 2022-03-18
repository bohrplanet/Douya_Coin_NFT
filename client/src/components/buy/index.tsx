import React from 'react'
import { Row, Col, Card, Input, Button } from 'antd';
import "./index.css"

export default function Buy() {
    return (
        <div className='buy'>
            <Row >
                <Col span={12} >
                    <div className='buy_main_left'>
                        <Card title="My wallet" bordered={true} style={{ width: 1000, height: 350 }}>
                            <span>Eth: </span>
                            <span>Connect wallet to see</span>
                            <br />
                            <br />
                            <span>Douya Coin: </span>
                            <span>Connect wallet to see</span>
                            <br />
                            <br />
                            <span>Transfer Douya Coin: </span>
                            <br />
                            <br />
                            <Input style={{ width: '400px' }} placeholder="Input amount" />
                            <br />
                            <br />
                            <Input style={{ width: '400px' }} placeholder="Target address" />
                            <Button type="primary">Submit</Button>
                        </Card>
                    </div>
                </Col>

                <Col span={12} >
                    <div className='buy_main_right'>
                        <Card title="Exchange" bordered={true} style={{ width: 1000, height: 350 }}>
                            <span>Deposit:  &nbsp;&nbsp; </span>
                            <Input style={{ width: '400px' }} placeholder="Input amount" />
                            <Button type="primary">Submit</Button>
                            <br />
                            <br />
                            <span>Withdraw: </span>
                            <Input style={{ width: '400px' }} placeholder="Input amount" />
                            <Button type="primary">Submit</Button>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
