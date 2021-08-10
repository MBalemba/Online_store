import React, {useContext, useEffect} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import BasketCard from "../../components/Basket/BasketCard";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import './Basket.css'
import {BiDotsVertical, BsDot, BsThreeDotsVertical, GoPrimitiveDot} from "react-icons/all";
import {useHistory} from "react-router-dom";

const Basket = observer(() => {
    const history = useHistory()
    const {basket, user} = useContext(Context)

    useEffect(()=>{

    }, [basket])

    if(user.isAuthAdmin){
        history.push('/')
    }

    return (


        <Container className={'mt'}>
            <Row>
                <Col md={9} >
                    <div className={'spanContainer'}>
                        <span className={'spanContainer__spanTop'}>
                        {basket.CountALl} товара
                    </span>

                        <span className={'spanContainer__spanTop_middle'}><BsDot/></span>
                        <span className={'spanContainer__spanTop spanContainer__spanTop_right'}>
                        {(basket.AllPrice.toLocaleString())} <i>₽</i>
                    </span>
                    </div>
                </Col>

            </Row>
            <Row>
                {basket.allCards.map(el=>
                    {
                        console.log(toJS(el))
                        debugger
                        return  <BasketCard key={el.id} id={el.id} count={el.count} />
                    }
                )}

            </Row>

            <Container>
                <Row>
                    <Col md={12}>
                        <div className={'makeAnOrder'}>
                            <Button  variant="primary" size="lg">
                                Сделать заказ
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>

    );
});

export default Basket;