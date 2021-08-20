import React, {useContext} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/svg/starBig.svg'
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useParams} from "react-router-dom";
import {toJS} from "mobx";
import './general.css'


const DevicePage = observer(() => {
    const {device} = useContext(Context)
    const {id} = useParams()
    const oneDevice = device.Devices.find((el)=>{
        if(el.id == id){
        return true
        } else return false
    })
    console.log('Device:', toJS(device.Devices), oneDevice)
    const description = oneDevice.deviceInfosDTO
    return (
        <Container className={'mt'}>
            <Row>
                <Col md={4}>
                    <Image style={{objectFit: ' contain',}} width={300} height={300} src={!oneDevice.isName ? oneDevice.pathFile :(process.env.REACT_APP_API_URL+'takeImage/'+ oneDevice.pathFile) }/>
                </Col>
                <Col md={4}>
                    <Row className={'d-flex flex-column align-items-center'}>
                        <h2>{oneDevice.name}</h2>
                        <div className={'d-flex align-items-center justify-content-center'}
                             style={{
                                 background: `url(${bigStar}) no-repeat center center`,
                                 width: 240,
                                 height: 240,
                                 backgroundSize: 'contain',
                                 fontSize: 64
                             }}
                        >

                            {oneDevice.ratings}
                        </div>
                    </Row>

                </Col>
                <Col md={4}>
                    <Card className={'d-flex flex-column align-items-center justify-content-around'}
                    style={{width: 300, height: 300, fontSize: 32, border: '2px solid lightgray', borderRadius: 4}}
                    >
                        <h3>От: {oneDevice.price} руб.</h3>
                        <Button variant={'outline-dark'}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>

            <Row className="d-flex flex-column m-5">
                <h1>Характеристики</h1>
                {description.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 ===0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
});

export default DevicePage;