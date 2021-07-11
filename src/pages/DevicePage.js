import React from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/starBig.svg'
const DevicePage = () => {
    const device = {id: 1, name: 'Iphone 12 pro', price: 25000 , rating: 5, img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000'}
    const description = [
        {id: 1, title: 'Оперативная память', description: '5 гб'},
        {id: 1, title: 'Оперативная память', description: '5 гб'},
        {id: 1, title: 'Оперативная память', description: '5 гб'},
        {id: 1, title: 'Оперативная память', description: '5 гб'},
        {id: 1, title: 'Оперативная память', description: '5 гб'},
        {id: 1, title: 'Оперативная память', description: '5 гб'},
    ]
    return (
        <Container className={'mt-3'}>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={device.img}/>
                </Col>
                <Col md={4}>
                    <Row className={'d-flex flex-column align-items-center'}>
                        <h2>{device.name}</h2>
                        <div className={'d-flex align-items-center justify-content-center'}
                             style={{
                                 background: `url(${bigStar}) no-repeat center center`,
                                 width: 240,
                                 height: 240,
                                 backgroundSize: 'contain',
                                 fontSize: 64
                             }}
                        >

                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card className={'d-flex flex-column align-items-center justify-content-around'}
                    style={{width: 300, height: 300, fontSize: 32, border: '2px solid lightgray', borderRadius: 4}}
                    >
                        <h3>От: {device.price} руб.</h3>
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
};

export default DevicePage;