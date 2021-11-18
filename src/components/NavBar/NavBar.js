import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import { Container, Form, FormControl, Nav as NavB, Navbar} from "react-bootstrap";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, USER_ROUTE} from "../../utils/consts";
import {ButtonS, Nav, NavElemWrapper} from "./navBarElements";
import {observer} from "mobx-react-lite";
import {useHistory} from 'react-router-dom'
import {BiLogIn, BiLogOut, FaUserCircle, IoLogOutOutline, RiShoppingBasketFill} from "react-icons/all";
import './NavBar.css'
import {AppBar, Button, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import Unlock from "../Common/Svg/Unlock";
import {NavLink} from "react-router-dom";
import {useStylesHeader} from "./Styles";
import Lock from "../Common/Svg/Lock";
import UnderHeaderMenu from "./UnderheaderMenu/UnderheaderMenu";
import AlertDialog from "../Common/AlertDialog/alert";




const NavBar = observer(() => {
    const {user, device, basket} = useContext(Context)
    const history = useHistory();
    const [isLock, setIsLock] = useState(true)
    const [isOutDialogOpen, changeIsOutDialogOpen] = React.useState(false)
    const classes = useStylesHeader()
    const handleLock = (bool)=>{
        setIsLock(bool);
    }

    const acountOut = (bool) => {
        changeIsOutDialogOpen(false)
        if(bool){
            user.Out()
        }
    }

    useEffect(()=>{

    }, [isLock])

    return (
        <>
            <AlertDialog callback={acountOut} questionText={'Вы точно хотите выйти?'} isOpen={isOutDialogOpen} />
            <AppBar className={classes.navbar} position="fixed">


                <Toolbar className={classes.toolbar} variant={'dense'}>
                    <div className={classes.toolbar__item}>
                        <NavLink className={classes.toolbar__buyDeviceLink} onClick={() => {
                        }} to={SHOP_ROUTE}>
                            <Typography  variant={'h5'}>
                                Купи девайс
                            </Typography>
                        </NavLink>


                        <Button onClick={()=>handleLock(!isLock)}  className={classes.toolbar__headerButton+' '+classes.toolbar__headerButton_leftMargin}
                                variant="primary"
                                color="secondary"
                        >
                            <Typography variant={'button'}>
                                каталог
                            </Typography>

                            {isLock ? <Lock className={classes.toolbar__icon} />:<Unlock className={classes.toolbar__icon} />}
                        </Button>
                    </div>



                    <div className={classes.toolbar__item}>
                        {user.isAuthAdmin
                            ?
                            <>
                                    <Button variant={'outline'} className={classes.toolbar__headerButton} onClick={() => (history.push(ADMIN_ROUTE))} >
                                        <NavElemWrapper>
                                            <p>Админ панель</p>
                                        </NavElemWrapper>
                                    </Button>

                                    <Button onClick={()=>changeIsOutDialogOpen(true)} variant={'outline'}>
                                        <NavElemWrapper>
                                            <p>Выйти</p>
                                        </NavElemWrapper>
                                        <BiLogOut/>
                                    </Button>

                            </>
                            :
                            <>
                                <Button className={classes.toolbar__headerButton} onClick={() => (user.isAuthUser?history.push(USER_ROUTE) : history.push(LOGIN_ROUTE))} variant={'outline'}>
                                    <NavElemWrapper>
                                        <Typography variant={'button'}>
                                            Профиль
                                        </Typography>
                                    </NavElemWrapper>
                                    <FaUserCircle/>
                                </Button>

                                <Button className={classes.toolbar__headerButton+' '+classes.toolbar__headerButton_leftMargin} onClick={() => (history.push(BASKET_ROUTE))} variant={'outline'}>
                                    <NavElemWrapper>
                                        <Typography variant={'button'}>
                                            Корзина
                                        </Typography>
                                    </NavElemWrapper>
                                    <RiShoppingBasketFill/>
                                    {basket.CountALl !== 0 &&
                                    <counterBasket>
                                        <p> {basket.CountALl}</p>
                                    </counterBasket>}

                                </Button>

                                {user.isAuthUser ?
                                    <Button className={classes.toolbar__headerButton+' '+classes.toolbar__headerButton_leftMargin} onClick={()=>changeIsOutDialogOpen(true)} variant={'outline'}>
                                        <NavElemWrapper>
                                            <p>Выйти</p>
                                        </NavElemWrapper>
                                        <BiLogOut/>
                                    </Button>
                                    :
                                    <Button className={classes.toolbar__headerButton+' '+classes.toolbar__headerButton_leftMargin} onClick={() => history.push(LOGIN_ROUTE)}
                                             variant={'outline'}>
                                        <NavElemWrapper>
                                            <Typography variant={'button'}>
                                                Авторицация
                                            </Typography>
                                        </NavElemWrapper>
                                        <BiLogIn/>
                                    </Button>}


                            </>
                        }
                    </div>

                    {!isLock && <UnderHeaderMenu handleLock = {handleLock}></UnderHeaderMenu> }
                </Toolbar>
            </AppBar>

{/*
            <Navbar fixed="top" bg="dark" variant="dark">
                <Container className={'NavBar'}>
                    <Nav onClick={() => {
                        device.cleanSelectedBrands()
                    }} to={SHOP_ROUTE}>КупиДевайс</Nav>

                    <NavB className="ml-auto" style={{color: 'white'}}>
                        {user.isAuthAdmin ? <>

                                <ButtonS onClick={() => (history.push(ADMIN_ROUTE))} variant={'outline'}>
                                    <NavElemWrapper>
                                        <p>Админ панель</p>
                                    </NavElemWrapper>
                                </ButtonS>

                                <ButtonS onClick={() => acountOut()} variant={'outline'}>
                                    <NavElemWrapper>
                                        <p>Выйти</p>
                                    </NavElemWrapper>
                                    <BiLogOut/>
                                </ButtonS>

                            </>
                            : ''
                        }


                        {user.isAuthUser
                            ?
                            <>
                                <ButtonS onClick={() => (history.push(USER_ROUTE))} variant={'outline'}>
                                    <NavElemWrapper>
                                        <p>Профиль</p>
                                    </NavElemWrapper>
                                    <FaUserCircle/>
                                </ButtonS>

                                <ButtonS onClick={() => (history.push(BASKET_ROUTE))} variant={'outline'}>
                                    <NavElemWrapper>
                                        <p>Корзина</p>
                                    </NavElemWrapper>
                                    {basket.CountALl !== 0 &&
                                    <div className={'counterBasket'}>
                                        <p> {basket.CountALl}</p>
                                    </div>}
                                </ButtonS>


                                <ButtonS onClick={() => acountOut()} variant={'outline'}>
                                    <NavElemWrapper>
                                        <p>Выйти</p>
                                    </NavElemWrapper>
                                    <BiLogOut/>
                                </ButtonS>
                            </>
                            :
                            ''
                        }

                        {
                            (user.isAuthAdmin || user.isAuthUser) === false
                                ?
                                <>
                                    <ButtonS onClick={() => (history.push(LOGIN_ROUTE))} variant={'outline-light'}>
                                        <NavElemWrapper>
                                            <p>Профиль</p>
                                        </NavElemWrapper>
                                        <FaUserCircle/>
                                    </ButtonS>

                                    <ButtonS onClick={() => (history.push(BASKET_ROUTE))} variant={'outline-light'}>
                                        <NavElemWrapper>
                                            <p>Корзина</p>
                                        </NavElemWrapper>
                                        <RiShoppingBasketFill/>
                                        {basket.CountALl !== 0 &&
                                        <div className={'counterBasket'}>
                                            <p> {basket.CountALl}</p>
                                        </div>}

                                    </ButtonS>

                                    <ButtonS onClick={() => history.push(LOGIN_ROUTE)}
                                             variant={'outline-light'}>
                                        <NavElemWrapper>
                                            Авторицация
                                        </NavElemWrapper>

                                        <BiLogIn/>
                                    </ButtonS>
                                </>
                                :
                                ''
                        }

                    </NavB>

                </Container>
            </Navbar>*/}
        </>

    );
});

export default NavBar;