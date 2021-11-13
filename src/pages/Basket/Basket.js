import React, {useContext, useEffect} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import BasketCard from "../../components/Basket/BasketCard";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import './Basket.css'
import {BiDotsVertical, BsDot, BsThreeDotsVertical, GoPrimitiveDot} from "react-icons/all";
import {Link, useHistory} from "react-router-dom";
import {Typography} from "@material-ui/core";

const Basket = observer(() => {
    const history = useHistory()
    const {basket, user, taskInstance} = useContext(Context)

    useEffect(() => {

    }, [basket])

    if (user.isAuthAdmin) {
        history.push('/')
    }


    const handlerCreatorOrder = () => (e) => {
        basket.formAnOrder(callbackStatusCheck, taskInstance)
    }

    function callbackStatusCheck(status, info){
        return user.checkStatus(status, info)
    }


    return (


        <Container className={'mt'}>
            <Row>
                <Col md={9}>

                    {basket.CountALl !== 0
                        ?
                        <div className={'spanContainer'}>
                        <span className={'spanContainer__spanTop'}>
                        {basket.CountALl} товара
                    </span>

                            <span className={'spanContainer__spanTop_middle'}><BsDot/></span>
                            <span className={'spanContainer__spanTop spanContainer__spanTop_right'}>
                        {(basket.AllPrice.toLocaleString())} <i>₽</i>
                    </span>
                        </div>
                        :
                        <div>
                            <Typography variant={'h4'}>
                        Нет товаров в корзине
                            </Typography>
                        </div>
                    }

                </Col>

            </Row>
            <div className={'cardWrapper'}>
                {basket.allCards.map(el => {
                        console.log(toJS(el))

                        return <BasketCard key={el.id} id={el.id} count={el.count}/>
                    }
                )}

            </div>

            {basket.CountALl !== 0 && user.isAuthUser &&
            <Container>
                <Row>
                    <Col md={12}>
                        <div className={'makeAnOrder'}>
                            <Button onClick={handlerCreatorOrder()} variant="primary" size="lg">
                                Сделать заказ
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            }

            <Row>
                <Col className={'mt-2 flex-row justify-content-end'} md={12}>
                    {!user.isAuthUser &&
                    <Typography variant={'overline'}><i>Чтобы сделать заказ, <Link to={'login'}>войдите</Link> в аккаунт, если нет аккаунта, <Link to={'registration'}>создайте</Link></i></Typography>
                    }
                </Col>
            </Row>

        </Container>

    );
});

export default Basket;