import React, {useContext, useState} from 'react';
import {Button, Card, Form, Row} from "react-bootstrap";
import {NavLink, Redirect, useHistory, useLocation} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/UserApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Container, Grid, Button as ButtonM, makeStyles, Paper, TextField, Typography} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({

    container: {
        marginTop: 54+61,
    },

    Paper: {
        margin: '0 auto',
        padding: '18px 17px',
        [theme.breakpoints.up('lg')]: {
            width: '770px'
        },
    },
    h4: {
        marginBottom: '26px'
    },
    paperContent: {},

    accountDataWrapper: {
        marginBottom: '26px'
    },

    accountDataWrapper__inputGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        height: '48px',
        marginBottom: '26px',
    },

    input: {
        marginBottom: '13px',
        '& .MuiInputBase-input': {
            height: '27px',
        }
    },

    buttonWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        height: '48px',
    },
    buttonWrapper__p: {
        display: 'flex',
        alignItems: 'center',
    }


}));


const Auth = observer(() => {
    const location = useLocation()
    const {user, taskInstance} = useContext(Context)
    const isLoginPage = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()


    const classes = useStyles()

    const click = async () => {
        if (isLoginPage) {
            user.doAutorizate(email, password, taskInstance)
                .then((data) => {
                    debugger
                    console.log(data)
                    taskInstance.createTask('Успешно', 'Successful')
                    history.push(ADMIN_ROUTE)
                })
                .catch(() => {
                    debugger
                    taskInstance.createTask('Ошибка регистрации', 'Warning')
                })
        } else {
            const response = await registration(email, password)
            taskInstance.createTask(response, 'Successful')
        }
    }


    if (user.isAuthAdmin) {
        return <Redirect to={'admin'}/>
    }

    if (user.isAuthUser) {
        return <Redirect to={'home'}/>
    }

    return (
        <Container className={classes.container} maxWidth="lg"
        >

            <Paper className={classes.Paper}>
                <form className={classes.paperContent}>

                    <Typography className={classes.h4}
                                variant="h4">{isLoginPage ? 'Авторизация' : 'Регистрация'}</Typography>

                    <div className={classes.accountDataWrapper}>
                        {!isLoginPage &&
                        <div className={classes.accountDataWrapper__inputGroup}>
                            <div className={classes.input}>
                                <TextField size="small"  id="outlined-basic" label="Фамилия"
                                           variant="outlined"/>
                            </div>
                            <div className={classes.input}>
                                <TextField size="small"  id="outlined-basic" label="Имя"
                                           variant="outlined"/>
                            </div>
                            <div className={classes.input}>
                                <TextField size="small"  id="outlined-basic" label="Отчество"
                                           variant="outlined"/>
                            </div>
                        </div>}


                        <div className={classes.input}>
                            <TextField size="small" fullWidth id="outlined-basic" label="Номер телефона"
                                       variant="outlined"/>
                        </div>

                        <div className={classes.input}>
                            <TextField size="small" fullWidth id="outlined-basic" label="Пароль" variant="outlined"/>
                        </div>

                    </div>


                    <div className={classes.buttonWrapper}>

                        {isLoginPage ?
                            <Typography className={classes.buttonWrapper__p} variant={"body1"}>
                                Нет аккаунта?&nbsp;
                                <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
                            </Typography>
                            :
                            <Typography className={classes.buttonWrapper__p} variant={"body1"}>
                                Есть аккаунт?&nbsp;
                                <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                            </Typography>
                        }


                        <ButtonM variant="contained">{isLoginPage ? 'Войти' : 'Зарегистрируйтесь'}</ButtonM>
                    </div>

                </form>
            </Paper>

            {/* <Card style={{width: 600}} className={'p-5'}>
                <h2 className={'m-auto'}>{isLoginPage ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className={'d-flex flex-column'}>
                    <Form.Control
                        className={'mt-3'}
                        placeholder="Введите Имеил"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className={'mt-3'}
                        placeholder="Введите пароль"
                        type={'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
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
                            {isLoginPage ? 'Войти' : 'Зарегистрируйтесь'}
                        </Button>
                    </Row>

                </Form>
            </Card>*/}
        </Container>
    );
});

export default Auth;