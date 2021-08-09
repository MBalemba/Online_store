import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../../components/Shop/TypeBar";
import SettingsBar from "../../components/Shop/SettingsBar/SettingsBar";
import DeviceList from "../../components/Shop/DeviceList/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import MyPagination from "../../components/Shop/Pagination";
import '../general.css'




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
        <Container>
            <Row className={'mt'}>

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