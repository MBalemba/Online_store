import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Button, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {Context} from "../../../index";
import {Image} from "react-bootstrap";
import star from "../../../assets/svg/star.svg";

import './CardProduct.css'

export const CardProduct = observer(({device}) => {
    const history = useHistory()
    const {basket, user} = useContext(Context)

    function clickCard(e){
        history.push('/device/'+device.id)
    }

    function buttonClick(id, price) {
        basket.toggleBasket(id, price)
    }

    return (
        <div className={'card'}>
            <div className={'card__picture'}>
                <img src={!device.isName ? device.pathFile : (process.env.REACT_APP_API_URL+'takeImage/'+ device.pathFile) }/>
            </div>

            <div className={'card__priceRating'}>

                <Typography variant={'subtitle2'} className={'card__price'}>
                    {(Number(device.price)).toLocaleString() + ' '} ₽
                </Typography>

                <div className={'card__rating'}>
                    <Typography variant={'subtitle2'}>{device.ratings}</Typography>
                    <Image src={star}/>
                </div>
            </div>

            <div onClick={clickCard} className="card__name">
                <Typography variant={'body1'}>
                    {device.name}
                </Typography>
            </div>

            <div className="card__button__wrapper">
                <Button
                    variant="contained"
                    className={'card__button'}
                    onClick={() => {
                        buttonClick(Number(device.id), device.price)
                    }}
                >
                    {basket.isBasketItem(Number(device.id)) && 'Убрать из корзины'}
                    {basket.isBasketItem(Number(device.id)) || 'В корзину'}
                </Button>
            </div>

        </div>
    )
})