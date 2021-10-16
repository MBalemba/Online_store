import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import star from '../../../assets/svg/star.svg'
import {useHistory} from 'react-router-dom'
import {DEVICE_ROUTE} from "../../../utils/consts";
import {Transition} from "react-transition-group";
import {Context} from "../../../index";
import './Device.css'
import {observer} from "mobx-react-lite";

const DeviceItem = observer(({device}) => {
    const history = useHistory()
    const {basket, user} = useContext(Context)
    const [basketButton, setBasketButton] = useState(false)

    function clickCard(e){
        if(e.target.tagName === 'BUTTON'){
            return
        }
        history.push('/device/'+device.id)
    }

    function buttonClick(id, price) {
        basket.toggleBasket(id, price)
    }

    useEffect(()=>{

    }, [basket.allCards])


    return (
        <div onMouseEnter={()=> setBasketButton(true)} onMouseLeave={()=> setBasketButton(false)} className={'mt-3 pb-5'} md={6} onClick={clickCard }>

            <div style={{width: 200, cursor: 'pointer', margin: '0 auto'}} border={'light'}>

                <Image style={{objectFit: 'contain', width: '100%'}} src={!device.isName? device.pathFile : (process.env.REACT_APP_API_URL+'takeImage/'+ device.pathFile) } width={150} height={150}/>

                <div  className={'text-black-50 d-flex justify-content-between mt-2'}>
                    <div className={'mb-1'}>{device.brandName}</div>
                    <div className={'d-flex align-items-center justify-content-between'}>
                        <div>{device.ratings}</div>
                        <Image src={star}/>
                    </div>
                </div>
                <h6>{device.name}</h6>


                {!user.isAuthAdmin &&
                <>
                     <div className={`basketContainer ${!basketButton && 'basketContainer__transparent'}`}>
                        <Button
                            onClick={() => {
                                buttonClick(Number(device.id), device.price)
                                setBasketButton(false)
                                setBasketButton(true)
                            }}
                            className={`basketButton`}
                            variant={!basket.isBasketItem(Number(device.id)) ?'primary': 'danger'}
                        >
                            {basket.isBasketItem(Number(device.id)) && 'Убрать из корзины'}
                            {basket.isBasketItem(Number(device.id)) || 'В корзину'}
                        </Button>
                    </div>

                </>
                }


            </div>

        </div>
    );
});

export default DeviceItem;