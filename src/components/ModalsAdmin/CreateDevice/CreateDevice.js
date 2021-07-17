import React, {createContext, useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {Div} from "./CreateDeviceElement";
import {CreateDeviceContext} from "../../../pages/Admin";
import Dropdowns from "./Dropdowns.jsx";
import NameAndPriceInput from "./NameAndPriceInput.jsx";
import LoadImage from "./LoadImage";




const CreateDevice = observer(({show, onHide, createDevice}) => {
    const {device, taskInstance} = useContext(Context)
    const [info, setInfo] = useState([])

    const addInfo = () => {
        setInfo([...info, {nameProperty: '', description: '', number: Date.now(),}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }


    // console.log(createDevice.Price)
    useEffect(()=>{
        console.log(createDevice.Brand)
    }, )

    return (
            <div>
                <Modal
                    show={show}
                    size="lg"
                    onHide={onHide}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Добавить новое устройство
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <Dropdowns createDevice={createDevice}/>

                            <NameAndPriceInput createDevice={createDevice}/>

                            <LoadImage createDevice={createDevice}/>


                            <Button onClick={() => addInfo()}
                                    variant={'outline-dark'}
                            >
                                Добавить новое свойство</Button>

                            {
                                info.map(i =>
                                    <Row className={"mt-2"} key={i.number}>
                                        <Col md={4}>
                                            <Form.Control
                                                value={i.nameProperty}
                                                onChange={(e) =>
                                                    setInfo(info.map(el => (el.number === i.number ? {
                                                        ...el,
                                                        nameProperty: e.target.value
                                                    } : {...el})))
                                                }

                                                placeholder={'Введите название характеристики'}
                                            />
                                        </Col>
                                        <Col md={4}>
                                            <Form.Control
                                                value={i.description}
                                                onChange={(e) =>
                                                    setInfo(info.map(el => (el.number === i.number ? {
                                                        ...el,
                                                        description: e.target.value
                                                    } : {...el})))
                                                }
                                                placeholder={'Введите описание характеристики'}
                                            />
                                        </Col>

                                        <Col md={4}>
                                            <Button onClick={() => removeInfo(i.number)}
                                                    variant={'outline-danger'}>Удалить</Button>
                                        </Col>

                                    </Row>
                                )
                            }
                        </Form>


                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
                        <Button variant={'outline-success'} onClick={() => {
                            let characteristic = info.filter(el => el.nameProperty && el.description).map(el=>({nameProperty: el.nameProperty, description: el.description }))
                            createDevice.deleteAll()
                            setInfo([])
                            taskInstance.createTask('не робит)', 'Warning')

                        }}>Добавить</Button>
                    </Modal.Footer>
                </Modal>
            </div>
    );
});

export default CreateDevice;