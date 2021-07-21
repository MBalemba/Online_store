import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {Card, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts";

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    const {type} = useParams();
    const location = useLocation();
    const history = useHistory()

    const clickCard = (brand, id) => {
        device.setSelectedBrand(id);
        history.push(location.pathname + '?brand=' + brand)
    }

    return (
        <Row className={'d-flex'}>
            {/*{brands.map(brand =>*/}
            {/*    <Card onClick={clickCard.bind(null, brand.name, brand.id)} key={brand.id} className={'p-3'}*/}
            {/*          border={brand.id === device.SelectedBrand ? 'danger' : 'light'}*/}
            {/*          style={{cursor: 'pointer'}}*/}
            {/*    >*/}
            {/*        {brand.name}*/}
            {/*    </Card>)}*/}

        </Row>
    );
});

export default BrandBar;