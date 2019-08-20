import React, { useState } from 'react';
import { Card, Icon, Avatar, Row, Col, Popconfirm, notification } from 'antd'
import './alumni.component.css';
import Config from '../config/app.local.conf';
import { GetAge } from './alumni.component.js';
import baseHeaders from '../utils/baseHeaders';

const { Meta } = Card;
const buildConfig = baseHeaders(localStorage.token);

export function AlumniCard(props) {
    const [auth] = useState(localStorage.getItem('token') || '');
    const guestActions = [
        <Icon type="linkedin" onClick={() => window.open(props.alumni.linkedin)} />,
        <Icon type="github" onClick={() => window.open(props.alumni.github)} />,
        <Icon onClick={() => window.open("alumni/" + props.alumni._id)} type="idcard" />
    ];

    const authActions = [
        <Popconfirm placement="top" title={'Are you sure you want to delete this alumni? This cannot be undone.'} okText="Yes" cancelText="No" onConfirm={() => confirmDeleteAlumni(props.alumni._id)}>
            <Icon type='close' />
        </Popconfirm>
    ];

    return (
        <Row>
            <Col span={24}>
                <Card
                    // style={{ width: 270 }}
                    cover={<img alt="example" src={props.alumni.avatar} />}
                    actions={auth ? authActions : guestActions}
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

function confirmDeleteAlumni(_id) {
        fetch(`${Config.websiteServiceUrl}alumni/${_id}`, buildConfig({
          method: `DELETE`
        }))
          .then(res => {
            if (!res.ok) {
              throw Error(res.statusText);
            }
            document.location.reload();
          })
          .catch(err => {
            notification['error']({
              message: 'Oh No! Something went wrong!',
              description: `Sorry about that! This alumni could not be removed from the list`
            });
          });
}