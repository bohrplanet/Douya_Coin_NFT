import React from 'react'
import { Row, Col, Card, Input, Button } from 'antd';
import "./index.css"
import Web3 from 'web3';

export default function Buy(props) {

    let x = React.useRef();
    let y = React.useRef();

    const [eth, setEth] = React.useState(0)
    const [douyacoin, setDouyacoin] = React.useState(0)

    console.log("props web3", props.web3);
    console.log("props contract ", props.contract);
    console.log("props accounts", props.accounts);
    console.log("props accounts[0]", props.accounts[0]);

    props.contract.methods.balanceOf(props.accounts[0]).call({ from: props.accounts[0], gas: 1000000 }, function (error, result) {
        console.log("result", setDouyacoin(result));
        console.log("error", error);
    });

    props.web3.eth.getBalance(props.accounts[0], function (error, result) {
        console.log("result", setEth(result));
        console.log("error", error);
    });

    function withdraw() {
        console.log("x", x.current.input.value);
        props.contract.methods.withdraw(x.current.input.value * (10 ** 18) + "").send({ from: props.accounts[0], gas: 1000000 }, function (error, result) {
            console.log("交易已经发出,等待钱包响应");
        }).on('transactionHash', function (hash) {
            console.log("1111111");
            console.log(hash);
        }).on('confirmation', function (confirmationNumber, receipt) {
            console.log("2222222");
            console.log(receipt);
        }).on('receipt', function (receipt) {
            console.log("33333333");
            console.log(receipt);
            for (var e in receipt.events) {
                if (e == "Sold") {
                    console.log("兑换成功！");
                }
            }
        }).on('error', console.error);
    }

    function deposit() {
        console.log("y", y.current.input.value);
        props.contract.methods.exchange().send({ from: props.accounts[0], value: y.current.input.value * (10 ** 18), gas: 1000000 }, function (error, result) {
            console.log("交易已经发出,等待钱包响应");
        }).on('transactionHash', function (hash) {
            console.log("1111111");
            console.log(hash);
        }).on('confirmation', function (confirmationNumber, receipt) {
            console.log("2222222");
            console.log(receipt);
        }).on('receipt', function (receipt) {
            console.log("33333333");
            console.log(receipt);
            for (var e in receipt.events) {
                if (e == "Bought") {
                    console.log("兑换成功！");
                }
            }
        }).on('error', console.error);
    }

    return (
        <div className='buy'>
            <Row >
                <Col span={12} >
                    <div className='buy_main_left'>
                        <Card title="My wallet" bordered={true} style={{ width: 1000, height: 350 }}>
                            <span>Eth: </span>
                            <span>{eth / (10 ** 18)}</span>
                            <br />
                            <br />
                            <span>Douya Coin: </span>
                            <span>{douyacoin / (10 ** 18)}</span>
                            <br />
                            <br />
                            {/* <span>Transfer Douya Coin: </span>
                            <br />
                            <br />
                            <Input style={{ width: '400px' }} placeholder="Input amount" />
                            <br />
                            <br />
                            <Input style={{ width: '400px' }} placeholder="Target address" />
                            <Button type="primary">Submit</Button> */}
                        </Card>
                    </div>
                </Col>

                <Col span={12} >
                    <div className='buy_main_right'>
                        <Card title="Exchange" bordered={true} style={{ width: 1000, height: 350 }}>
                            <span>Deposit:  &nbsp;&nbsp; </span>
                            <Input ref={y} style={{ width: '400px' }} placeholder="Input amount" />
                            <Button type="primary" onClick={deposit}>Submit</Button>
                            <br />
                            <br />
                            <span>Withdraw: </span>
                            <Input ref={x} style={{ width: '400px' }} placeholder="Input amount" />
                            <Button type="primary" onClick={withdraw}>Submit</Button>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
