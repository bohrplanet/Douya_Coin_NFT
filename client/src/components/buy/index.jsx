import React from 'react'
import { Row, Col, Card, Input, Button } from 'antd';
import "./index.css"
import store from '../../redux/store'

export default function Buy(props) {

    let x = React.useRef();
    let y = React.useRef();

    const [eth, setEth] = React.useState(0)
    const [douyacoin, setDouyacoin] = React.useState(0)

    // console.log("props web3", props.web3);
    // console.log("props contract ", props.contract);
    // console.log("props accounts", props.accounts);
    // console.log("props accounts[0]", props.accounts[0]);

    React.useEffect(() => {

        let webObj = store.getState();

        const { web3, accounts, contract } = webObj;

        // 先去redux里面访问web3对象，如果不存在，那么就把值设置为connect wallet to watch
        // 如果有web3对象，那么就调用方法，把eth和豆芽币的值拿到，set给state
        console.log("from redux", webObj);
        // console.log("accounts", accounts[0]);

        if (webObj !== 0) {
            contract.methods.balanceOf(accounts[0]).call({ from: accounts[0], gas: 1000000 }, function (error, result) {
                if (result !== douyacoin) {
                    console.log("result", setDouyacoin(result));
                    console.log("error", error);
                }
            });

            web3.eth.getBalance(accounts[0], function (error, result) {
                if (result !== eth) {
                    console.log("result", setEth(result));
                    console.log("error", error);
                }
            });
        }

        else {

        }

        // component will unmount
        return () => { }
    }, [eth, douyacoin])

    function withdraw() {

        let webObj = store.getState();

        const { accounts, contract } = webObj;

        console.log("x", x.current.input.value);
        contract.methods.withdraw(x.current.input.value * (10 ** 18) + "").send({ from: accounts[0], gas: 1000000 }, function (error, result) {
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
                if (e === "Sold") {
                    console.log("兑换成功！");
                }
            }
        }).on('error', console.error);
    }

    function deposit() {

        let webObj = store.getState();

        const { accounts, contract } = webObj;
        
        console.log("y", y.current.input.value);
        contract.methods.exchange().send({ from: accounts[0], value: y.current.input.value * (10 ** 18), gas: 1000000 }, function (error, result) {
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
                if (e === "Bought") {
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
                            <span className='font'>Eth: </span>
                            <span className='font'>{eth / (10 ** 18)}</span>
                            <br />
                            <br />
                            <span className='font'>Douya Coin: </span>
                            <span className='font'>{douyacoin / (10 ** 18)}</span>
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
