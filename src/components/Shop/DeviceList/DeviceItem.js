import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from './../../../assets/star.svg'
import {useHistory} from 'react-router-dom'
import {DEVICE_ROUTE} from "../../../utils/consts";

const DeviceItem = ({device}) => {
    const history = useHistory()

    return (
        <Col className={'mt-3'} md={3} onClick={() => history.push(DEVICE_ROUTE +'/'+ device.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={'light'}>
                <Image src={device.img} width={150} height={150}/>
                <div className={'text-black-50 d-flex justify-content-between mt-2'}>
                    <div>Samsung...</div>
                    <div className={'d-flex align-items-center justify-content-between'}>
                        <div>{device.rating}</div>
                        <Image src={star}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;