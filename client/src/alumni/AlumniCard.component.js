import React from 'react';
import { Card, Icon, Avatar, Row, Col } from 'antd'
import './alumni.component.css';
import { GetAge } from './alumni.component.js';
const { Meta } = Card;



export function AlumniCard(props) {

    return (
        <Row>
            <Col span={24}>
                <Card
                    // style={{ width: 270 }}
                    cover={<img alt="example" src={props.alumni.avatar} />}
                    actions={[
                        <Icon type="linkedin" onClick={() => window.open(props.alumni.linkedin)} />,
                        <Icon type="github" onClick={() => window.open(props.alumni.github)} />,
                        <Icon onClick={() => window.open("alumni/" + props.alumni._id)} type="idcard" />
                    ]}
                >

                    <Meta
                        avatar={<Avatar src={props.alumni.avatar} />}
                        title={props.alumni.firstName + " " + props.alumni.lastName}
                        description={"Age: " + GetAge(props.alumni.birthday)}
                    />
                    <br />
                    <p className="languages">{props.alumni.languages + "\n"}</p>
                </Card>
            </Col>
        </Row>
    )
}