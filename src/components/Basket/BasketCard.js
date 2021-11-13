import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import star from "../../assets/svg/star.svg";
import {giveDeviceById} from "../../http/UserApi";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {AiOutlineCloseCircle, AiOutlineCloseSquare, BiMinus, BiPlus, BsTrash, GrClose} from "react-icons/all";
import './BaskerCard.css'
import {useHistory} from "react-router-dom";

const BasketCard = observer(({id, count}) => {

    const {basket} = useContext(Context)

    useEffect(() => {
        giveDeviceById(id).then((response) => {

            console.log('response', response)
            SetDevice(response.data)
        }).catch(({response}) => {
            basket.toggleBasket(id)
        })
    }, [])

    const history = useHistory()

    function buttonClick(id) {
        basket.toggleBasket(id)
    }

    const [device, SetDevice] = useState(null)

    return (
        <>


            <div className={'cardBasket'}>
                {!device
                    ? 'load'
                    : <div>


                        <div className={'imageContainer'}>
                            <Image style={{objectFit: 'contain', width: '100%'}}
                                   src={!device.isName ? device.pathFile : (process.env.REACT_APP_API_URL + 'takeImage/' + device.pathFile)}
                                   width={150} height={150}/>
                        </div>
                        <hr/>
                        <div className={'mb-2 mt-3 containerCloseButton'}>

                            <div className={'counterPanel'}>

                                <Button disabled={count === 1} onClick={() => basket.decrease(id)}
                                        className={'counterPanel__button'}
                                        variant="outline-s">
                                    <BiMinus color={count === 1 && ''}/>
                                </Button>

                                <p className={'counterPanel__countTagP'}>
                                    {count}
                                </p>

                                <Button disabled={count === 10} onClick={() => basket.increase(id)}
                                        className={'counterPanel__button'}
                                        variant="outline-s">
                                    <BiPlus color={count === 10 && 'gray'}/>
                                </Button>

                            </div>


                            <Button
                                onClick={() => {
                                    buttonClick(Number(device.id))
                                }}
                                className={`buttonClose`}
                                variant={!basket.isBasketItem(Number(device.id)) ? 'primary' : 'outline-danger'}
                            >
                                <BsTrash/>
                            </Button>
                        </div>


                        <div className={'d-flex justify-content-between mt-2 cardBrandPriceBasket'}>
                            <div className={'mb-1'}>{device.brandName}</div>
                            <div className={'basketCardPrice'}>
                                <i >{(Number(device.price) * count).toLocaleString()} <i>₽</i></i>
                            </div>
                        </div>


                        <div className={'d-flex align-items-center justify-content-end'}>
                            <div>{device.ratings}</div>
                            <Image src={star}/>
                        </div>



                        <p className={'BasketH6'} onClick={() => history.push('/device/' + device.id)}>{device.name}</p>





                    </div>
                }


            </div>
        </>
    );
})

export default BasketCard;