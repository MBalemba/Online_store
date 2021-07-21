import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/Shop/TypeBar";
import BrandBar from "../components/Shop/BrandBar";
import DeviceList from "../components/Shop/DeviceList/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";




const Shop = observer(() => {
    const {device, user} = useContext(Context)
    console.log(user.isAuth)

    useEffect(()=>{
            device.setBrandInType()
        }
        , [])

    return (
        <Container className={'mt-2'}>
            <Row>
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <DeviceList />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;