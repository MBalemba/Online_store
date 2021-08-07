import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/Shop/TypeBar";
import SettingsBar from "../components/Shop/SettingsBar/SettingsBar";
import MyPagination from "../components/Shop/Pagination";
import DeviceList from "../components/Shop/DeviceList/DeviceList";
import BasketCard from "../components/Basket/BasketCard";

const Basket = () => {
    return (
        <Container className={'mt-2'}>
            <Row>
                <BasketCard />
            </Row>
        </Container>
    );
};

export default Basket;