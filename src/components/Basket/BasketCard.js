import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import star from "../../assets/star.svg";
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
            debugger
            console.log('response', response)
            SetDevice(response.data)
        }).catch(({response}) => {
            debugger
        })
    }, [])

    const history = useHistory()

    function buttonClick(id) {
        basket.toggleBasket(id)
    }

    const [device, SetDevice] = useState(null)

    return (
        <>


            <Col md={2} className={'mt-3 pb-5'}>
                {!device
                    ? 'load'
                    : <Card style={{width: 'auto', cursor: 'pointer', margin: '0 auto'}} border={'light'}>


                        <div className={'imageContainer'}>
                            <Image style={{objectFit: 'contain', width: '100%'}}
                                    src={!device.isName ? device.pathFile : (process.env.REACT_APP_API_URL + 'takeImage/' + device.pathFile)}
                                    width={150} height={150}/>
                        </div>

                        <div className={'mb-2 mt-3 containerCloseButton'}>

                            <div className={'counterPanel'}>

                                <Button onClick={() => basket.decrease(id)} className={'counterPanel__button'}
                                     variant="outline-secondary">
                                    <BiMinus color={count===1 && 'gray'}/>
                                </Button>

                                <p className={'counterPanel__countTagP'}>
                                    {count}
                                </p>

                                <Button onClick={() => basket.increase(id)} className={'counterPanel__button'}
                                     variant="outline-secondary">
                                    <BiPlus color={count===10 && 'gray'}/>
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

                        <div className={'text-black-50 d-flex justify-content-between mt-2'}>
                            <div className={'mb-1'}>{device.brandName}</div>
                            <div className={'d-flex align-items-center justify-content-between'}>
                                <div>{device.ratings}</div>
                                <Image src={star}/>
                            </div>
                        </div>
                        <p className={'BasketH6'} onClick={() => history.push('/device/' + device.id)}>{device.name}</p>


                    </Card>
                }


            </Col>
        </>
    );
});

export default BasketCard;