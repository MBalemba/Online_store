import React, {useContext, useState} from 'react';
import {Button, Card, Form, Row} from "react-bootstrap";
import {NavLink, Redirect, useHistory, useLocation} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {codeConfirmation, login, registration} from "../http/UserApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {
    Container,
    Grid,
    Button as ButtonM,
    makeStyles,
    Paper,
    TextField,
    Typography,
    FormControl, InputLabel, Input, OutlinedInput
} from "@material-ui/core";
import {Formik, Form as FormFormik, useField, useFormik, Field} from 'formik';
import * as Yup from 'yup';
import MaskedInput from "react-text-mask/dist/reactTextMask";
import NumberFormat from "react-number-format";


const useStyles = makeStyles((theme) => ({

    container: {
        marginTop: 54 + 61,
    },

    Paper: {
        margin: '0 auto',
        padding: '18px 17px',
        [theme.breakpoints.up('lg')]: {
            width: '770px'
        },
    },
    h4: {
        marginBottom: '36px',

    },
    paperContent: {},

    accountDataWrapper: {
        marginBottom: '26px'
    },

    accountDataWrapper__inputGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        // transition:'margin-bottom 0.5s ease-in-out',
        marginBottom: '',
    },
    accountDataWrapper__kodVerification: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
    },

    input: {
        marginBottom: '20px',
        transition: 'all 0.5s ease-in-out',
        '& .MuiInputBase-input': {
            height: '27px',
        }
    },

    input_mr:{
        marginRight: '1rem',
    },

    input_Up: {
        maxWidth: '224px',
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

function TextMaskCustom(props) {
    const {inputRef, ...other} = props;
    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                console.log('ref.inputElement', ref)

                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        >


        </MaskedInput>
    );
}


function NumberFormatCustom(props) {
    const {inputRef, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            format="+7 (###) ###-####"
            mask="_"
        />
    );
}

function KodFormatCustom(props) {
    const {inputRef, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            format="######"
            mask="_"
        />
    );
}


const Auth = observer(() => {
    const location = useLocation()
    const {user, taskInstance} = useContext(Context)
    const isLoginPage = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isKod, setIsKod] = useState({appear: false, value: ''})
    const history = useHistory()
    const [customIsSubmitting, setCustomIsSubmitting ] = useState(false)

    const validate = values => {
        const errors = {};
        if (!values.fullName.firstName) {
            errors.firstName = 'Пустое поле';
        } else if (values.fullName.firstName.length > 15) {
            errors.firstName = 'Must be 15 characters or less';
        }

        if (!values.fullName.lastName) {
            errors.lastName = 'Пустое поле';
        } else if (values.fullName.lastName.length > 20) {
            errors.lastName = 'Must be 20 characters or less';
        }

        if (!values.fullName.patronymic) {
            errors.patronymic = 'Пустое поле';
        } else if (values.fullName.patronymic.length > 20) {
            errors.patronymic = 'Must be 20 characters or less';
        }

        return errors;
    };


    const validationErrorObject = isLoginPage
        ?
        {
            number: Yup.string().required('Пустое поле').test('kod', 'Не заполнен номер', val => {
                return val === '' ? true : val?.match(/\d/g)?.join('')?.length === 11
            }),
            password: Yup.string().required('Заполните!'),
        }
        : (isKod.appear
                ?
                {
                    fullName: Yup.object().shape({
                        firstName: Yup.string().max(15, 'больше 15 символов запрещено').matches(/(^[\p{sc=Cyrillic}]+$)/ui, 'Только русские буквы, без пробелов').required('Пустое поле'),
                        lastName: Yup.string().max(20, 'больше 20 символов запрещено').matches(/(^[\p{sc=Cyrillic}]+$)/ui, 'Только русские буквы, без пробелов').required('Пустое поле'),
                        patronymic: Yup.string().max(20, 'больше 20 символов запрещено').matches(/(^[\p{sc=Cyrillic}]+$)/ui, 'Только русские буквы, без пробелов').required('Пустое поле'),
                    }),
                    number: Yup.string().required('Пустое поле'),
                    kod: Yup.string().test('kod', 'Должно быть 6 символов', val => {
                        ;
                        return val === '' ? true : val?.match(/\d/g)?.join('')?.length === 6
                    }).required('Пустое поле'),

                }
                :
                {
                    fullName: Yup.object().shape({
                        firstName: Yup.string().max(15, 'больше 15 символов запрещено').matches(/(^[\p{sc=Cyrillic}]+$)/ui, 'Только русские буквы, без пробелов').required('Пустое поле'),
                        lastName: Yup.string().max(20, 'больше 20 символов запрещено').matches(/(^[\p{sc=Cyrillic}]+$)/ui, 'Только русские буквы, без пробелов').required('Пустое поле'),
                        patronymic: Yup.string().max(20, 'больше 20 символов запрещено').matches(/(^[\p{sc=Cyrillic}]+$)/ui, 'Только русские буквы, без пробелов').required('Пустое поле'),
                    }),
                    number: Yup.string().required('Пустое поле'),
                    password: Yup.string().required('Заполните!'),

                }
        )


    const validationSchema = Yup.object().shape(validationErrorObject)


    // const formik = useFormik({
    //     initialValues,
    //     validationSchema: validationSchema,
    //     onSubmit: values => {
    //         alert(JSON.stringify(values, null))
    //     },
    //
    // })


    const classes = useStyles()

    const click = async () => {
        if (isLoginPage) {
            user.doAutorizate(email, password, taskInstance)
                .then((data) => {

                    console.log(data)
                    taskInstance.createTask('Успешно', 'Successful')
                    history.push(ADMIN_ROUTE)
                })
                .catch(() => {

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

            <Paper elevation={3} className={classes.Paper}>
                <Formik
                    initialValues={
                        {
                            fullName: {
                                lastName: '',
                                firstName: '',
                                patronymic: '',
                            },
                            number: '',
                            password: '',
                            kod: '',
                        }
                    }
                    validationSchema={validationSchema}
                    onSubmit={async (values, {setSubmitting}) => {
                        setCustomIsSubmitting(true)
                        const
                            fullName = values.fullName.lastName + ' ' + values.fullName.firstName + ' ' + values.fullName.patronymic,
                            telephoneNumber = '+' + values.number.match(/\d/g).join(''),
                            password = values.password;
                        if (isLoginPage) {
                            user.doAutorizate(telephoneNumber, password, taskInstance)
                                .then((data) => {

                                    console.log(data)
                                    taskInstance.createTask('Успешно', 'Successful')
                                    history.push(ADMIN_ROUTE)
                                })
                                .catch(() => {

                                    setCustomIsSubmitting(false)
                                    taskInstance.createTask('Ошибка авторизации', 'Warning')
                                })
                        } else {

                            user.doRegistaration({
                                FIO: fullName,
                                telephoneNumber: telephoneNumber,
                                password: password
                            }).then(() => {

                                taskInstance.createTask('Заполните код, который пришел на ваш номер телефона', 'Warning')
                                setIsKod({appear: true, value: ''})
                                setTimeout(() => {
                                    setCustomIsSubmitting(false);
                                }, 1000)
                            })
                                .catch(() => {

                                    taskInstance.createTask('Проблема регистрации', 'Warning')
                                    setTimeout(() => {
                                        setCustomIsSubmitting(false);
                                    }, 1000)
                                })
                        }

                    }
                    }
                >
                    {formik => <form onSubmit={formik.handleSubmit} className={classes.paperContent}>

                        <Typography className={classes.h4}
                                    variant="h3">
                            <center>
                                {isLoginPage ? 'Авторизация' : (!isKod.appear? 'Регистрация': 'Подтвердить код')}
                            </center>
                        </Typography>

                        <div className={classes.accountDataWrapper}>
                            {!isKod.appear && <>

                                {!isLoginPage &&
                                <div className={classes.accountDataWrapper__inputGroup}>
                                    <div className={classes.input + ' ' + classes.input_Up}>
                                        <TextField
                                            type={'text'}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.fullName.lastName}
                                            name={'fullName.lastName'}
                                            error={formik.touched.fullName?.lastName && Boolean(formik.errors.fullName?.lastName)}
                                            helperText={formik.touched.fullName?.lastName && formik.errors.fullName?.lastName}
                                            size="small" id="outlined-basic" label="Фамилия"
                                            variant="outlined"/>
                                    </div>
                                    <div className={classes.input + ' ' + classes.input_Up}>
                                        <TextField
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.fullName.firstName}
                                            name={'fullName.firstName'}
                                            error={formik.touched.fullName?.firstName && Boolean(formik.errors.fullName?.firstName)}
                                            helperText={formik.touched.fullName?.firstName && formik.errors.fullName?.firstName}
                                            size="small" id="outlined-basic" label="Имя"
                                            variant="outlined"/>
                                    </div>
                                    <div className={classes.input + ' ' + classes.input_Up}>
                                        <Field
                                            as={TextField}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.fullName.patronymic}
                                            name={'fullName.patronymic'}
                                            error={formik.touched.fullName?.patronymic && Boolean(formik.errors.fullName?.patronymic)}
                                            helperText={formik.touched.fullName?.patronymic && formik.errors.fullName?.patronymic}
                                            size="small" id="outlined-basic" label="Отчество"
                                            variant="outlined"/>
                                    </div>
                                </div>}


                                <div className={classes.input}>
                                    <TextField
                                        value={formik.values.number}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.number && Boolean(formik.errors.number)}
                                        helperText={formik.touched.number && formik.errors.number}
                                        name={'number'}
                                        size="small" fullWidth id="outlined-basic" label="Номер телефона"
                                        variant="outlined"

                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />
                                </div>

                                <div className={classes.input}>
                                    <TextField
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                        name={'password'}
                                        type={'password'} size="small" fullWidth id="outlined-basic" label="Пароль"
                                        variant="outlined"/>
                                </div>

                            </>}


                            {
                                isKod.appear && <div className={classes.accountDataWrapper__kodVerification}>
                                    <div className={classes.input + ' '+ classes.input_mr}>
                                        <TextField
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.kod}
                                            error={formik.touched.kod && Boolean(formik.errors.kod)}
                                            helperText={formik.touched.kod && formik.errors.kod}
                                            name={'kod'}
                                            type={'text'} size="small" id="outlined-basic" label="Код"
                                            variant="outlined"
                                            InputProps={{
                                                inputComponent: KodFormatCustom,
                                            }}

                                        />
                                    </div>

                                    <div className={classes.buttonWrapper}>
                                        <ButtonM disabled={formik.errors?.kod || formik.values.kod === ''} onClick={() => {
                                            codeConfirmation({
                                                telephoneNumber: '+' + formik.values.number.match(/\d/g).join(''),
                                                code: formik.values.kod
                                            }).then((r) => {
                                                taskInstance.createTask('Вы успешно зарегистрироровались', 'Success')
                                                history.push(LOGIN_ROUTE)
                                            }).catch(({response}) => {

                                                taskInstance.createTask('Неверный код отправлен', 'Warning')
                                            })
                                        }} variant="contained">Подтвердить код</ButtonM>
                                    </div>



                                </div>
                            }

                            {/*<div style={{maxWidth: '100%', wordWrap: 'break-word'}}>

                                <Typography style={{maxWidth: '100%', wordWrap: 'break-word'}} variant={'body1'}>
                                    {JSON.stringify(formik.values)}
                                </Typography>
                                <hr/>
                                <br/>
                                <Typography variant={'body1'}>
                                    {'\n' +
                                    JSON.stringify(formik.errors)}
                                </Typography>
                                <hr/>
                                <br/>
                                <Typography variant={'body1'}>
                                    {'\n' + JSON.stringify(formik.touched)}
                                </Typography>
                                <hr/>
                                <br/>
                                <Typography variant={'body1'}>
                                    {'\n' +'isSubmitting: ' +JSON.stringify(formik.isSubmitting)}
                                </Typography>
                            </div>*/}
                        </div>

                        {!isKod.appear &&
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


                            <ButtonM disabled={customIsSubmitting} type="submit"
                                     variant="contained">{isLoginPage ? 'Войти' : 'Зарегистрируйтесь'}</ButtonM>

                        </div>
                        }
                    </form>
                    }
                </Formik>
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
            </Card>*/
            }
        </Container>
    )
        ;
});

export default Auth;