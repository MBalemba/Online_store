import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {Card, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts";
import {BarLoader} from "react-spinners";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    const {type: typeUrl} = useParams();
    const location = useLocation();
    const history = useHistory()
    const brands = typeUrl ? (device.BrandInType.filter((type)=> type.name===typeUrl))[0]?.brandDTOS: []
    console.log('type from params: ', typeUrl , brands )


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
                    <Card onClick={clickCard.bind(null, brand.name)} key={brand.id} className={'p-3'}
                          border={Boolean(device.SelectedBrands[brand.name]) ? 'danger' : 'light'}
                          style={{cursor: 'pointer'}}
                    >
                        {brand.name}
                    </Card>)
            }



        </Row>
    );
});

export default BrandBar;