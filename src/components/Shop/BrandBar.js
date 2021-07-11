import React, {useContext} from 'react';
import {Context} from "../../index";
import {Card, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <Row className={'d-flex'}>
            {device.Brands.map(brand=>
            <Card onClick={()=>device.setSelectedBrand(brand)} key={brand.id} className={'p-3'}
                border={brand.id === device.SelectedBrand.id ? 'danger' : 'light'}
                  style={{cursor: 'pointer'}}
            >
                {brand.name}
            </Card>)}

        </Row>
    );
});

export default BrandBar;