import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Button, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {Context} from "../../../index";
import {Image} from "react-bootstrap";
import star from "../../../assets/svg/star.svg";
import './CardProduct.css'
import {Rating} from "@mui/material";


export const ButtonBasket = observer(({id = null, price =null , classCust ='', color = 'primary'})=>{

    const {basket} = useContext(Context)

    function buttonClick(id, price) {

        basket.toggleBasket(id!==null? Number(id): id, price)
    }

    return  <Button
        variant="contained"
        color = {color}
        className={classCust}
        onClick={() => {
            buttonClick(id, price)
        }}
    >
        {basket.isBasketItem(Number(id)) && 'Убрать из корзины'}
        {basket.isBasketItem(Number(id)) || 'В корзину'}
    </Button>
})

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
            </div>
            <div onClick={clickCard} className="card__name">
                <Typography variant={'body1'}>
                    {device.name.length>30 ?device.name.slice(0,30)+ ' ...' : device.name}
                </Typography>
            </div>
            <div className={'card__rating'}>
                <Rating name="read-only" value={Number(device.ratings)} readOnly />
            </div>
            <div className="card__button__wrapper">


                <ButtonBasket id={device.id} price={device.price} classCust={'card__button'} />
            </div>

        </div>
    )
})