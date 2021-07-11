import React, {useContext, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)

    const [info, setInfo] = useState([])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now(), }])
    }

    const removeInfo= (number)=>{
        setInfo(info.filter(i=> i.number !== number))

    }

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
                        Добавить новый тип
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Dropdown className={"mt-2 mb-2"}>
                            <Dropdown.Toggle>Выберете бренд></Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.Devices.map(device =>
                                    <Dropdown.Item key={device.id}>
                                        {device.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown className={"mt-2 mb-2"}>
                            <Dropdown.Toggle>Выберете тип></Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.Types.map(type =>
                                    <Dropdown.Item key={type.id}>
                                        {type.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Form.Control
                            className={'mt-3'}
                            placeholder={'Введите название устройства'}/>

                        <Form.Control
                            type={'number'}
                            className={'mt-3'}
                            placeholder={'Введите название устройства'}/>

                        <Form.Control
                            type={'file'}
                            className={'mt-3'}
                            placeholder={'Введите название устройства'}/>

                        <hr/>

                        <Button onClick={()=>addInfo()}
                            variant={'outline-dark'}
                        >
                            Добавить новое свойство</Button>

                        {
                            info.map(i =>
                                <Row className={"mt-2"} key={i.number}>
                                    <Col md={4}>
                                        <Form.Control
                                        placeholder={'Введите название характеристики'}
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Form.Control
                                            placeholder={'Введите описание характеристики'}
                                        />
                                    </Col>

                                    <Col md={4}>
                                        <Button onClick={()=>removeInfo(i.number)}  variant={'outline-danger'}>Удалить</Button>
                                    </Col>

                                </Row>
                            )
                        }
                    </Form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
                    <Button variant={'outline-success'} onClick={onHide}>Добавить</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});

export default CreateDevice;