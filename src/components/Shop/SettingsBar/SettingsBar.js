import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import {Col, Container, Dropdown, FormControl, InputGroup, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {SHOP_ROUTE} from "../../../utils/consts";
import {BarLoader} from "react-spinners";
import {GoSettings, ImCheckboxChecked, ImCheckboxUnchecked} from "react-icons/all";
import {CSSTransition, Transition} from "react-transition-group";
import '../Shop.css'
import './settingsBar.css'
import InputRange from "react-input-range";
import 'react-input-range/lib/css/index.css'
import {Button, Divider, Typography} from "@material-ui/core";
import {Input, Slider} from "@mui/material";


const minDistance = 1000

const SettingsBar = observer(() => {
    const {device} = useContext(Context)
    const {type: typeUrl} = useParams();
    const history = useHistory()
    const brands = typeUrl ? (device.BrandInType.filter((type) => type.name === typeUrl))[0]?.brands : []
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const {search} = useLocation();

    let [value1, SetValue1] = useState([12, 20])


    useEffect(() => {
        debugger
        device.returnPriceRangeToInitial()
    }, [typeUrl])

    useEffect(() => {
        SetValue1([Number(device.ClientMinPrice), Number(device.ClientMaxPrice),])
    }, [device.ClientMinPrice, device.ClientMaxPrice])


    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            SetValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            SetValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };

    function MenuVisible() {
        setIsOpenMenu(!isOpenMenu)
    }

    function approveSettings() {
        device.setCurrentPage(1)
        device.setPriceQuery(value1)
        history.push(`${typeUrl}?${device.createStrParamsForRequest(typeUrl)}`)
    }

    return (
        <div className={'mt-3 mb-3'}>

            {typeUrl &&
            <div className={'pb-3'}>
                <Button className={'buttonSettings'} onClick={MenuVisible} variant="outlined" size="medium">
                    <p>
                        <span className={'mr-2'}>Дополнительные параметры поиска</span>
                        <GoSettings viewBox="0 0 20 20" height="10" width="10"/>
                    </p>
                </Button>
            </div>
            }


            <Transition
                in={isOpenMenu}
                timeout={{
                    enter: 500,
                    exit: 500,
                }}
                exit={false}
                mountOnEnter={true}
                unmountOnExit={true}
            >
                {(state) => <div className={`mt-3`}>

                    <div className={`settingsAppear ${state}`}>


                        <Row className={`flex-column`}>

                            {device.BrandInType.length === 0
                                ?
                                <BarLoader/>
                                :
                                brands.map(brand =>
                                    <div className={'blockBrandsSettings'} xs={12} key={brand.id}>
                                        <div onClick={() => device.changeSelectedBrand(typeUrl, brand.name)}
                                              className={'checkBlockBrand'}
                                              style={{cursor: 'pointer', margin: '0.5rem'}}
                                        >
                                            <Typography variant={'body2'}>{brand.name}</Typography>
                                            {brand.isCheck
                                                ? <ImCheckboxChecked/>
                                                : <ImCheckboxUnchecked/>
                                            }
                                        </div>
                                        <Divider/>

                                    </div>
                                )
                            }
                        </Row>

                        {Number(device.MaxPrice) !== Number(device.MinPrice) && <>
                            {/*<Row className={'mt-2 flex justify-content-between'}>
                                <p>{device.MinPrice}</p>
                                <p>{device.MaxPrice}</p>
                            </Row>
*/}
                            <Row>
                                <Col md={12} className={'slider-container'}>

                                   {/* <InputRange
                                        maxValue={Number(device.MaxPrice)}
                                        minValue={Number(device.MinPrice)}
                                        formatLabel={value => ``}
                                        value={value1}
                                        onChange={value => {
                                            console.log('value: ', value)
                                            // if (value.max - value.min >= (device.MaxPrice - device.MinPrice) / 8) {
                                            //
                                            // }
                                            SetValue1(value)
                                        }
                                        }

                                        onChangeComplete={value => console.log(value)}
                                    />*/}

                                    <Slider
                                        getAriaLabel={() => 'Minimum distance'}
                                        value={value1}
                                        onChange={handleChange1}
                                        valueLabelDisplay="auto"
                                        min= {Number(device.MinPrice)}
                                        max = {Number(device.MaxPrice)}
                                        disableSwap
                                    />


                                </Col>


                                <Col className={'wrapperInputRangeSlider'} md={12}>
                                    <Row >
                                        <Col md={6}>
                                                <div>Цена от</div>
                                                <Input value={value1[0]} defaultValue="Hello world" />
                                        </Col>

                                        <Col md={6}>

                                            <div>Цена до</div>
                                            <Input  value={value1[1]}defaultValue="Hello world" />

                                        </Col>
                                    </Row>
                                </Col>


                            </Row>
                        </>

                        }

                        <Row className={'flex justify-content-end'}>
                            <Button variant="outlined" size="large" onClick={() => {
                                approveSettings()
                                setIsOpenMenu(!isOpenMenu)
                            }} >
                                Применить
                            </Button>
                        </Row>

                    </div>

                </div>

                }
            </Transition>


        </div>
    );
}
)

export default SettingsBar;