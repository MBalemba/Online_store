import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {Accordion, Button, Card, Col, Container, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts";
import {BarLoader} from "react-spinners";
import {GoSettings} from "react-icons/all";

const SettingsBar = observer(() => {
    const {device} = useContext(Context)
    const {type: typeUrl} = useParams();
    const history = useHistory()
    const brands = typeUrl ? (device.BrandInType.filter((type) => type.name === typeUrl))[0]?.brandDTOS : []
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [selectedBrands, setSelectedBrands] = useState(device.SelectedBrands)


    const clickCard = (nameBrand) => {
        // device.setSelectedBrands(nameBrand, Boolean(!device.SelectedBrands[nameBrand]));
        setSelectedBrands({...selectedBrands, [nameBrand]: selectedBrands[nameBrand] ? false : true})
    }

    useEffect(() => {
        setSelectedBrands(device.SelectedBrands)
    }, [device.SelectedBrands])


    function MenuVisible() {
        setIsOpenMenu(!isOpenMenu)
    }

    function approveSettings() {
        device.setSelectedBrands(selectedBrands)
        device.setCurrentPage(1)
        history.push(`${typeUrl}?${device.createStrParamsForRequest()}`)
    }

    return (
        <Container className={'mt-3 mb-3'}>

            {typeUrl &&
            <Row>
                <Button onClick={MenuVisible} variant={'outline-primary'}>
                    <p>
                        <span className={'mr-2'}>Дополнительные параметры поиска</span>
                        <GoSettings viewBox="0 0 20 20" height="10" width="10"/>
                    </p>
                </Button>
            </Row>
            }


            {isOpenMenu
                ? <Container className={'mt-3 border-danger'}>


                    <Row className={'d-flex'}>

                        {device.BrandInType.length === 0
                            ?
                            <BarLoader/>
                            :
                            brands.map(brand =>
                                <Col md={3} key={brand.id}>
                                    <Card onClick={clickCard.bind(null, brand.name)} className={'p-3'}
                                          border={
                                              Boolean(selectedBrands[brand.name])
                                                  ? 'primary'
                                                  : 'light'
                                          }
                                          style={{cursor: 'pointer', margin: '0.5rem'}}
                                    >
                                        {brand.name}
                                    </Card>
                                </Col>
                            )
                        }
                    </Row>

                    <Row className={'flex justify-content-end'}>
                        <Button onClick={approveSettings} variant={'outline-primary'}>
                            Применить
                        </Button>
                    </Row>


                </Container>
                :
                ''
            }


        </Container>
    );
})

export default SettingsBar;