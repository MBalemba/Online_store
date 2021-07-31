import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/Shop/TypeBar";
import SettingsBar from "../components/Shop/SettingsBar";
import DeviceList from "../components/Shop/DeviceList/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import MyPagination from "../components/Shop/Pagination";




const Shop = observer(() => {
    const {device, user} = useContext(Context)

    useEffect(()=>{
            device.setBrandInType()
            return ()=>{
                device.toggleStatusLoadDevices(true)
            }
        }
        , [])

    return (
        <Container className={'mt-2'}>
            <Row>

                <Col md={3}>
                    <TypeBar/>
                    <SettingsBar />

                </Col>
                <Col md={9}>
                    <SettingsBar />
                    <MyPagination />
                    <DeviceList />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;