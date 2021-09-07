import React, {Component, useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../../components/Shop/TypeBar";
import SettingsBar from "../../components/Shop/SettingsBar/SettingsBar";
import DeviceList from "../../components/Shop/DeviceList/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import MyPagination from "../../components/Shop/Pagination";
import '../general.css'
import './Slider.css'
import {Button, makeStyles, Paper} from "@material-ui/core";
import {Gallery} from "../../utils/gallery";
import {styled} from '@material-ui/core/styles';
import {BiLeftArrow, BiRightArrow, BsDot} from "react-icons/all";
import Slider from "./Slider";


const useStyles = makeStyles((theme) => ({
        container: {
            padding: '10px',
            boxSizing: 'border-box',
            position: 'related',
            overflowX: 'hidden',
        },
    })
)






const Shop = observer(() => {
    const {device, user} = useContext(Context)

    useEffect(() => {
            device.setBrandInType()
            return () => {
                device.toggleStatusLoadDevices(true)
            }
        }
        , [])

    return (
        <Container>
            <Row className={'mt'}>

                <Col md={3}>
                    <TypeBar/>
                    <SettingsBar/>

                </Col>
                <Col md={9}>
                    <SettingsBar/>
                    <MyPagination/>
                    <DeviceList/>
                    <Slider/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;