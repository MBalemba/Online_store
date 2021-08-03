import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, Redirect, useHistory, useLocation} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/UserApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const location = useLocation()
    const {user, taskInstance} = useContext(Context)
    const isLoginPage = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const click = async () =>{
        if(isLoginPage){
            user.doAutorizate(email, password, taskInstance)
                .then((data)=>{
                    console.log(data)
                    taskInstance.createTask('Успешно', 'Successful')
                    history.push(ADMIN_ROUTE)
                })
                .catch(()=>{
                    taskInstance.createTask('Ошибка регистрации', 'Warning')
                })
        } else{
            const response = await registration(email, password)
            taskInstance.createTask(response, 'Successful')
        }
    }


    if(user.isAuthAdmin){
        return <Redirect to={'admin'}/>
    }

    if(user.isAuthUser){
        return <Redirect to={'home'}/>
    }

    return (
        <Container className={"d-flex justify-content-center align-items-center"}
                   style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className={'p-5'}>
                <h2 className={'m-auto'}>{isLoginPage ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className={'d-flex flex-column'}>
                    <Form.Control
                        className={'mt-3'}
                        placeholder="Введите Имеил"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <Form.Control
                        className={'mt-3'}
                        placeholder="Введите пароль"
                        type={'password'}
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                    <Row className={'d-flex justify-content-between mt-3 pr-3 pl-3'}>
                        {isLoginPage ?
                            <div>
                                Нет аккаунта?
                                <NavLink to={REGISTRATION_ROUTE}> Зарегистрируйтесь</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт?
                                <NavLink to={LOGIN_ROUTE}> Войдите</NavLink>
                            </div>
                        }
                        <Button
                            onClick={() => click()}
                            variant={'outline-success'}>
                            {isLoginPage? 'Войти': 'Зарегистрируйтесь'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;