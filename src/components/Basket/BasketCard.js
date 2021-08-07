import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import star from "../../assets/star.svg";
import {giveDeviceById} from "../../http/UserApi";

const BasketCard = () => {



    useEffect(()=>{
        giveDeviceById.then((response)=>{
            console.log('response', response)
            debugger
        })
    }, [])

        const [infos, SetInfos] = useState({})

    return (
        <Col className={'mt-3 pb-5'}>

{/*            <Card style={{width: 200, cursor: 'pointer', margin: '0 auto'}} border={'light'}>*/}

{/*/!**/}
{/*                <Image style={{objectFit: 'contain', width: '100%'}} src={!device.isName? device.pathFile : (process.env.REACT_APP_API_URL+'takeImage/'+ device.pathFile) } width={150} height={150}/>*/}
{/**!/*/}

{/*                <div  className={'text-black-50 d-flex justify-content-between mt-2'}>*/}
{/*                    <div className={'mb-1'}>device.brandName</div>*/}
{/*                    <div className={'d-flex align-items-center justify-content-between'}>*/}
{/*                        <div>device.ratings</div>*/}
{/*                        <Image src={star}/>*/}
{/*                    </div>*/}
{/*                </div>*/}
{/*                <h6>{device.name}</h6>*/}



{/*                <div className={'basketContainer'}>*/}
{/*                    <Button*/}
{/*                        onClick={() => {*/}
{/*                            buttonClick(Number(device.id))*/}
{/*                            setBasketButton(false)*/}
{/*                            setBasketButton(true)*/}
{/*                        }}*/}
{/*                        className={`basketButton`}*/}
{/*                        variant={!basket.isBasketItem(Number(device.id)) ?'primary': 'danger'}*/}
{/*                    >*/}
{/*                        {basket.isBasketItem(Number(device.id)) && 'Убрать из корзины'}*/}
{/*                        {basket.isBasketItem(Number(device.id)) || 'В корзину'}*/}
{/*                    </Button>*/}
{/*                </div>*/}

{/*            </Card>*/}

        </Col>
    );
};

export default BasketCard;