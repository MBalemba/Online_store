import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {Accordion, Button, Card, Col, Container, Dropdown, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts";
import {BarLoader} from "react-spinners";
import {GoSettings, ImCheckboxChecked, ImCheckboxUnchecked} from "react-icons/all";
import {CSSTransition, Transition} from "react-transition-group";
import './Shop.css'


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
            <Container className={'pb-3'}>
                <Button onClick={MenuVisible} variant={'outline-primary'}>
                    <p>
                        <span className={'mr-2'}>Дополнительные параметры поиска</span>
                        <GoSettings viewBox="0 0 20 20" height="10" width="10"/>
                    </p>
                </Button>
            </Container>
            }


            <Transition
                in={isOpenMenu}
                timeout={{
                    enter: 500,
                    exit: 500,
                }}
                exit ={false}
                mountOnEnter={true}
                unmountOnExit={true}
            >
                {(state) => <Container className={`mt-3`}>
                    <div className={`settingsAppear ${state}`}>


                        <Row className={`flex-column`}>

                            {device.BrandInType.length === 0
                                ?
                                <BarLoader/>
                                :
                                brands.map(brand =>
                                    <Col xs={12} key={brand.id}>
                                        <Card onClick={clickCard.bind(null, brand.name)}
                                              className={'p-3 flex-row align-items-center justify-content-between'}
                                              style={{cursor: 'pointer', margin: '0.5rem'}}
                                        >
                                            <p>{brand.name}</p>
                                            {Boolean(selectedBrands[brand.name])
                                                ? <ImCheckboxChecked/>
                                                : <ImCheckboxUnchecked/>
                                            }


                                        </Card>
                                    </Col>
                                )
                            }
                        </Row>

                        <Row className={'flex justify-content-end'}>
                            <Button onClick={()=>{
                                approveSettings()
                                setIsOpenMenu(!isOpenMenu)
                            }} variant={'outline-primary'}>
                                Применить
                            </Button>
                        </Row>

                    </div>

                </Container>}
            </Transition>


        </Container>
    );
})

export default SettingsBar;