import React, {useContext} from 'react';
import {Context} from "../../index";
import {Button, Container, Form, FormControl, Nav as NavB, Navbar} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {NavLink} from "react-router-dom";
import {Nav} from "./navBarElements";
import {observer} from "mobx-react-lite";
import {useHistory} from 'react-router-dom'

const NavBar = observer(() => {
    const {user, device} = useContext(Context)
    const history = useHistory();
    const acountOut = () => {
        user.Out()
    }

    return (

        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav onClick={() => {
                    device.cleanSelectedBrands()
                }} to={SHOP_ROUTE}>КупиДевайс</Nav>

                {user.isAuthAdmin ? <NavB className="ml-auto" style={{color: 'white'}}>
                    <Button onClick={() => (history.push(ADMIN_ROUTE))} variant={'outline-light'}>Админ панель</Button>
                    <Button onClick={() => acountOut()} className={"ml-2"} variant={'outline-light'}>Выйти</Button>
                </NavB> : ''
                }

                {user.isAuthUser ? <NavB className="ml-auto" style={{color: 'white'}}>
                    <Button onClick={() => acountOut()} className={"ml-2"} variant={'outline-light'}>Выйти</Button>
                </NavB> : ''}

                {
                    (user.isAuthAdmin || user.isAuthUser) === false
                        ?
                        <NavB className="ml-auto" style={{color: 'white'}}>
                            <Button onClick={() => history.push(LOGIN_ROUTE)}
                                    variant={'outline-light'}>Авторицация</Button>
                        </NavB>
                        :
                        ''
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;