import React, { useState } from 'react'
import { Layout, Menu, Row, Col, Image } from 'antd';
import 'antd/dist/antd.css'
import './index.css'
import big_pic from '../../img/big_pic.png'

const { Header, Footer, Sider, Content } = Layout;

export default function Home() {

    const [sum, setSum] = useState(1)

    return (
        <Content className="content" style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
                <Row>
                    <Col span={12} >
                        <h1 className="main_left" style={{ color: "#f36b3b" }}>Douya</h1>
                        <h1 className="main_left" style={{ color: "#f36b3b" }}>MΞmΞ coin</h1>
                    </Col>
                    <Col span={12} className="main_right">
                        <Image
                            src={big_pic}
                            preview={false}
                            height={900}
                            width={900}
                        />
                    </Col>
                </Row>
            </div>
        </Content>
    )
}