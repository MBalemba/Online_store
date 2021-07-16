import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/Shop/TypeBar";
import BrandBar from "../components/Shop/BrandBar";
import DeviceList from "../components/Shop/DeviceList/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getTypeBrand} from "../http/UserApi";




const Shop = observer(() => {
    const {device} = useContext(Context)
    useEffect(
        async ()=>{
            try {
                let response = await getTypeBrand()
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }
    )
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