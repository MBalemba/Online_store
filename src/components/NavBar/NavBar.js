import React, {useContext} from 'react';
import {Context} from "../../index";
import {Button, Container, Form, FormControl, Nav as NavB, Navbar} from "react-bootstrap";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, USER_ROUTE} from "../../utils/consts";
import {ButtonS, Nav, NavElemWrapper} from "./navBarElements";
import {observer} from "mobx-react-lite";
import {useHistory} from 'react-router-dom'
import {BiLogIn, BiLogOut, FaUserCircle, IoLogOutOutline, RiShoppingBasketFill} from "react-icons/all";
import './NavBar.css'
const NavBar = observer(() => {
    const {user, device, basket} = useContext(Context)
    const history = useHistory();
    const acountOut = () => {
        user.Out()
    }

    return (

        <Navbar  fixed="top" bg="dark" variant="dark">
            <Container className={'NavBar'} >
                <Nav onClick={() => {
                    device.cleanSelectedBrands()
                }} to={SHOP_ROUTE}>КупиДевайс</Nav>

                <NavB className="ml-auto" style={{color: 'white'}}>
                    {user.isAuthAdmin ? <>

                            <ButtonS onClick={() => (history.push(ADMIN_ROUTE))} variant={'outline-light'}>
                                <NavElemWrapper>
                                    <p>Админ панель</p>
                                </NavElemWrapper>
                            </ButtonS>

                            <ButtonS onClick={() => acountOut()} variant={'outline-light'}>
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
                            <ButtonS onClick={() => (history.push(USER_ROUTE))} variant={'outline-light'}>
                                <NavElemWrapper>
                                    <p>Профиль</p>
                                </NavElemWrapper>
                                <FaUserCircle/>
                            </ButtonS>

                            <ButtonS onClick={() => (history.push(BASKET_ROUTE))} variant={'outline-light'}>
                                <NavElemWrapper>
                                    <p>Корзина</p>
                                </NavElemWrapper>
                                {basket.CountALl !== 0 &&
                                <div className={'counterBasket'}>
                                    <p> {basket.CountALl}</p>
                                </div>}
                            </ButtonS>


                            <ButtonS onClick={() => acountOut()} variant={'outline-light'}>
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
        </Navbar>
    );
});

export default NavBar;