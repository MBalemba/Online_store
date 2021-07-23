import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {Card, Col, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts";
import {BarLoader} from "react-spinners";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    const {type: typeUrl} = useParams();
    const history = useHistory()
    const brands = typeUrl ? (device.BrandInType.filter((type)=> type.name===typeUrl))[0]?.brandDTOS: []

    const clickCard = (nameBrand) => {
        device.setSelectedBrands(nameBrand, Boolean(!device.SelectedBrands[nameBrand]));
    }

    useEffect(()=>{
            device.cleanSelectedBrands()
    }, [typeUrl])


    if(!typeUrl){
        return ''
    }

    return (
        <Row className={'d-flex'}>

            {device.BrandInType.length === 0
            ?
               <BarLoader />
            :
                brands.map(brand =>
                    <Col md={3} key={brand.id}>
                        <Card onClick={clickCard.bind(null, brand.name)}  className={'p-3'}
                              border={Boolean(device.SelectedBrands[brand.name]) ?'primary' : 'light'}
                              style={{cursor: 'pointer', margin: '0.5rem'}}
                        >
                            {brand.name}
                        </Card>
                    </Col>
                )
            }



        </Row>
    );
});

export default BrandBar;