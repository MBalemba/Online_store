import React, {useEffect} from 'react';
import Slider from "../../../pages/Shop/Slider";
import {Box, Container, makeStyles, Paper, Typography} from "@material-ui/core";
import {MainShopStyles} from "./MainShopStyles";
import MainPageStore from "../../../store/MainPageStore";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";


const mainPageStore = new MainPageStore()

const MainShop = observer(() => {
    const classes = MainShopStyles()
    const history = useHistory()

    useEffect(() => {
        mainPageStore.setBrandInType()
    }, [])

    useEffect(() => {
    }, [mainPageStore.topCategory])
    return (
        <div className={classes.root}>
            <div className={classes.sliderContainer}>
                <Slider id={'mainpage_1'} render={()=>
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
                } />
            </div>

            <Paper className={classes.secondPage}>
                    <Typography className={classes.titlePage_2} component={'h1'} variant={'h1'}>Топ категорий</Typography>




                <div className={classes.cardList}>
                    {mainPageStore.topCategory.map((el, id) =>
                        <div className={classes.cardList__item}
                             onClick={() => history.push('/home/' + el === 'неопределено' ? '' : el)}
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
                    <Slider id={'mainpage_2'} render={()=>
                        <>
                            <div className="slide slide-3">

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
                    } />
                </div>


            </Paper>





        </div>
    );
})

export default MainShop;