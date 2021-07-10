import React, {useContext} from 'react';
import {Context} from "../../index";
import {Button, Container, Form, FormControl, Nav as NavB, Navbar} from "react-bootstrap";
import {SHOP_ROUTE} from "../../utils/consts";
import {NavLink} from "react-router-dom";
import {Nav} from "./navBarElements";
import {observer} from "mobx-react-lite";

const NavBar = observer( () => {
    const {user} = useContext(Context)
    return (


        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav to={SHOP_ROUTE}>КупиДевайс</Nav>

                {user._isAuth?<NavB className="ml-auto" style={{color: 'white'}}>
                    <Button variant={'outline-light'}>Админ панель</Button>
                    <Button className={"ml-2"} variant={'outline-light'}>Выйти</Button>
                </NavB>: <NavB className="ml-auto" style={{color: 'white'}}>
                    <Button onClick={()=>user.setIsAuth(true) } variant={'outline-light'}>Авторицация</Button>
                </NavB>}
            </Container>
        </Navbar>
    );
});

export default NavBar;