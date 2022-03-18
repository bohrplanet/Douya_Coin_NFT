import React from 'react'
import { Row, Col, Card, Input, Button } from 'antd';
import "./index.css"

export default function Buy(props: any) {

    const [eth, setEth] = React.useState(0)
    const [douyacoin, setDouyacoin] = React.useState(0)

    console.log("props web3", props.web3);
    console.log("props contract ", props.contract);
    console.log("props accounts", props.accounts);
    console.log("props accounts[0]", props.accounts[0]);

    props.contract.methods.balanceOf(props.accounts[0]).call({ from: props.accounts[0], gas: 1000000 }, function (error: any, result: any) {
        console.log("result", result);
        console.log("error", error);
    });

    return (
        <div className='buy'>
            <Row >
                <Col span={12} >
                    <div className='buy_main_left'>
                        <Card title="My wallet" bordered={true} style={{ width: 1000, height: 350 }}>
                            <span>Eth: </span>
                            <span>{eth}</span>
                            <br />
                            <br />
                            <span>Douya Coin: </span>
                            <span>{douyacoin}</span>
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
