import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from './../../../assets/star.svg'
import {useHistory} from 'react-router-dom'
import {DEVICE_ROUTE} from "../../../utils/consts";

const DeviceItem = ({device}) => {
    const history = useHistory()

    return (
        <Col className={'mt-3'} md={6} onClick={() => history.push('/device/'+device.id)}>

            <Card style={{width: 200, cursor: 'pointer', margin: '0 auto'}} border={'light'}>

                <Image style={{objectFit: 'contain',}} src={!device.isName? device.pathFile : (process.env.REACT_APP_API_URL+'takeImage/'+ device.pathFile) } width={150} height={150}/>

                <div className={'text-black-50 d-flex justify-content-between mt-2'}>
                    <div>{device.brandName}...</div>
                    <div className={'d-flex align-items-center justify-content-between'}>
                        <div>{device.ratings}</div>
                        <Image src={star}/>
                    </div>
                </div>

                <div>{device.name}</div>
            </Card>

        </Col>
    );
};

export default DeviceItem;