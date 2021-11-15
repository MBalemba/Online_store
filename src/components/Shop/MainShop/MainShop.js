import React, {useEffect} from 'react';
import Slider from "../../../pages/Shop/Slider";
import {Box, Container, Divider, makeStyles, Paper, Typography} from "@material-ui/core";
import {MainShopStyles} from "./MainShopStyles";
import MainPageStore from "../../../store/MainPageStore";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {BsInfoCircle, FaLink, MdHome} from "react-icons/all";
import mapImg from './../../../assets/img/footer/Image.png'
import {Vk, Youtube, Instagram, Facebook} from "../../../assets/svg/foooter";
import {CardProduct} from "../../Common/CardProduct/CardProduct";
import  phoneImg from './../../../assets/img/mainPage/mobile.jpg'
import  Tv from './../../../assets/img/mainPage/tv.jpg'
import  Pc from './../../../assets/img/mainPage/Pc.jpg'
import  stone from './../../../assets/img/mainPage/stone.jpg'
import  Washer from './../../../assets/img/mainPage/Washer.jpg'
import  fridge from './../../../assets/img/mainPage/fridge.jpg'


const imgMassive = [phoneImg, Tv, Pc, fridge, Washer, stone]

const mainPageStore = new MainPageStore()

export const Footer = observer(() => {

    useEffect(()=>{
        mainPageStore.setBrandInType()
    }, [])

    const history = useHistory()
    const classes = MainShopStyles()
    return (
        <div className={classes.thirdPage}>
            <div className={classes.footer}>

                <div className={classes.footer__left}>
                    <div onClick={() => {

                    }} className={classes.footer__left_item + ' ' + classes.footer__header}>
                        <Typography variant={'h6'}>На главную</Typography>
                        <MdHome/>
                    </div>


                    {mainPageStore.topCategory.map((el, id) =>
                        <div className={classes.footer__left_item}
                             onClick={() => {
                                 history.push(`/home${el === 'неопределено' ? '' : '/' + el}`)
                             }}
                             key={id}>
                            <Typography variant={'body'}>{el}</Typography>
                            <FaLink/>
                        </div>
                    )}

                </div>


                <div className={classes.footer__middle}>
                    <Typography className={classes.footer__header} variant={'h6'}>Магазины в Москве</Typography>
                    <div className={classes.png}>
                        <img src={mapImg} alt=""/>
                    </div>

                    <div className={classes.button__middle}>
                        <div className={classes.icons}>
                            <Vk/>
                            <Youtube/>
                            <Instagram/>
                            <Youtube/>
                        </div>

                        <div>
                            <a className={classes.number} href="tel:+74957802002">
                                <Typography variant={'body1'}>+7(495)780-20-02
                                </Typography>
                            </a>

                        </div>
                    </div>
                </div>


                <div className={classes.footer__right}>
                    <div className={classes.footer__left_item + ' ' + classes.footer__header}>
                        <Typography variant={'h6'}>Покупателям</Typography>
                        <BsInfoCircle/>
                    </div>
                    <div className={classes.footer__left_item}>
                        <Typography variant={'body'}>Гарантия</Typography>
                    </div>
                    <div className={classes.footer__left_item}>
                        <Typography variant={'body'}>Сервис доставки</Typography>
                    </div>
                    <div className={classes.footer__left_item}>
                        <Typography variant={'body'}>Как сделать заказ ?</Typography>
                    </div>
                    <div className={classes.footer__left_item}>
                        <Typography variant={'body'}>Как отменить заказ ?</Typography>
                    </div>
                    <div className={classes.footer__left_item}>
                        <Typography variant={'body'}>Как зарегистрироваться ?</Typography>
                    </div>

                </div>
            </div>

            <Divider/>

            <div className={classes.allRightsReserved}>
                <Typography variant={'body2'}>
                    © Купи девайс 2021
                </Typography>
            </div>

        </div>
    )
});




const MainShop = observer(() => {
    const classes = MainShopStyles()
    const history = useHistory()

    useEffect(() => {
        mainPageStore.setBrandInType()
        mainPageStore.doRequestFromDevices()
    }, [])

    useEffect(() => {
    }, [mainPageStore.topCategory])
    return (
        <div className={classes.root}>
            <div className={classes.sliderContainer}>
                <Slider id={'mainpage_1'} render={() =>
                    <>
                        <div className="slide slide-3">
                            <img src="https://images.wbstatic.net/bners1/big_holodilnik_25_08.jpg" alt=""
                                 className="slide_slideImage__29MbQ"/>
                        </div>
                        <div className="slide slide-1">
                            <img src="https://images.wbstatic.net/bners1/big_school_25_08.jpg" alt=""
                                 className="slide_slideImage__29MbQ"/>
                        </div>
                        <div className="slide slide-2">
                            <img src="https://images.wbstatic.net/bners1/pull_666.jpg" alt=""
                                 className="slide_slideImage__29MbQ"/>
                        </div>
                        <div className="slide slide-4">
                            <img src="https://images.wbstatic.net/bners1/big_school_25_08.jpg" alt=""
                                 className="slide_slideImage__29MbQ"/>
                        </div>
                    </>
                }/>
            </div>

            <Paper className={classes.secondPage}>
                <Typography className={classes.titlePage_2} component={'h1'} variant={'h2'}>Топ категорий</Typography>


                <div className={classes.cardList}>
                    {mainPageStore.topCategory.map((el, id) =>
                        <div className={classes.cardList__item}
                             /*style={{backgroundImage: `url(${imgMassive[id]})`, objectFit: 'cover', objectPosition: '0% 0%', }}*/
                             onClick={() => {
                                 history.push(`/home${el === 'неопределено' ? '' : '/' + el}`)
                             }}
                             key={id}>
                            <div>
                                {el}
                            </div>
                        </div>
                    )}
                </div>


            </Paper>


            <Paper className={classes.secondPage}>
                <Typography className={classes.titlePage_2} component={'h2'} variant={'h2'}>Новинки</Typography>
                <div className={classes.sliderContainer}>
                    <Slider devices={mainPageStore.giveDevices.length} id={'mainpage_2'} render={() =>
                        <>
                            {mainPageStore.giveDevices.map((el, index)=><div className="slide">
                                <div className={classes.classList}>
                                    {el.map(device=> <CardProduct device={device} />)}
                                </div>
                            </div> )}
                        </>
                    }/>
                </div>


            </Paper>


        </div>
    );
})




export default MainShop;