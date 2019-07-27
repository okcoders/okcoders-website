import React, { useState, useEffect } from 'react';
import Config from '../config/app.local.conf.js'
import { notification, Row, Col, Divider } from 'antd'
import { isEmpty } from 'lodash'
import './alumni.component.css';
import { Logo } from './OKCoderLogo.component';
import { AlumniCard } from './AlumniCard.component'

//spruce up the detail page
export function AlumniDetail(props) {
    console.log(props)
    const [alumni, setAlumni] = useState({});
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log("called", alumni, error)
        if (isEmpty(alumni) && !error) {
            fetch(Config.websiteServiceUrl + `alumni/` + props.match.params.id)
                .then(res => res.json())
                .then(json => setAlumni(json))
                .catch(err => {
                    setError(true)
                    displayErrorNotification(err)
                })
        }
    });

    function displayErrorNotification(err) {
        notification['error']({
            message: 'Could not get alumni',
            description: 'Sorry, the alumni you requested was not found'
        })
    }

    return (
        <>
            <Logo />
            <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                <Row>
                    <Col span={8}>
                        {!error && <AlumniCard alumni={alumni} />}
                    </Col>
                    <Col span={10}>
                        <div style={{
                            fontSize: '25px',
                            color: "green"
                        }}> Bio
                        <Divider />
                            <p style={{
                                fontSize: '16px',
                                color: "black"
                            }}>{alumni.bio}</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

