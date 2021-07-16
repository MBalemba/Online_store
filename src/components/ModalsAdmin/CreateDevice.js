import React, {useContext, useState} from 'react';
import {Button, Col, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import CreateDeviceStore from "../../store/CreateDeviceInfo";
import {Div} from "./CreateDeviceElement";

const createDevice = new CreateDeviceStore()

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)


    const [info, setInfo] = useState([])
    const [selectedFile, setSelectedFile] = useState(null)

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now(),}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))

    }

    function onFileUpload(e) {
        if (!selectedFile) {
            createDevice.setImg(e.target.files[0]);
            setSelectedFile(e.target.files[0])
        }
        console.log(createDevice.Img);
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
                        Добавить новое устройство
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Dropdown className={"mt-2 mb-2"}>
                            <Dropdown.Toggle>{createDevice.Type || 'Выберете тип'}></Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.BrandInType.map(type =>
                                    <Dropdown.Item
                                        onClick={() => createDevice.setType(type.name)}
                                        key={type.name}>
                                        {type.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                        {createDevice.Type ?
                            <Dropdown className={"mt-2 mb-2"}>
                                <Dropdown.Toggle>{createDevice.Brand || 'Выберете бренд'}></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {device.BrandInType.filter(unit => unit.name === createDevice.Type).map(({brandDTOS}) => {
                                            return brandDTOS.map(brand => <Dropdown.Item
                                                onClick={() => createDevice.setBrand(brand)}
                                                key={brand}>
                                                {brand}
                                            </Dropdown.Item>)
                                        }
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                            :
                            ''
                        }


                        <Form.Control
                            className={'mt-3'}
                            value={createDevice.Name}
                            onChange={(e) =>
                                createDevice.setName(e.target.value)}
                            placeholder={'Введите название устройства'}/>

                        <Form.Control
                            type={'number'}
                            value={createDevice.Price}
                            onChange={(e) =>
                                createDevice.setPrice(e.target.value)}
                            className={'mt-3'}
                            placeholder={'Введите цену'}/>

                        <hr/>

                        {selectedFile
                            ?<Div url={window.URL.createObjectURL(selectedFile)} className={'mt-2 mb-2 grid justify-content-center align-items-center'}>
                                <Div style={{backgroundColor: 'rgba(0,0,0,0.5)', color: 'white'}} variant="secondary" >
                                    <h2>Файл выбран</h2>
                                    <Button onClick={()=>setSelectedFile(null)} size="lg" variant={'warning'}>Изменить загруженный файл</Button></Div>
                            </Div>
                            :
                            <Form.Control
                                type={'file'}
                                onChange={onFileUpload}
                                className={'mt-3'}
                            />}

                        <hr/>

                        <Button onClick={() => addInfo()}
                                variant={'outline-dark'}
                        >
                            Добавить новое свойство</Button>

                        {
                            info.map(i =>
                                <Row className={"mt-2"} key={i.number}>
                                    <Col md={4}>
                                        <Form.Control
                                            value={i.title}
                                            onChange={(e) =>
                                                setInfo(info.map(el => (el.number === i.number ? {
                                                    ...el,
                                                    title: e.target.value
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
                        info.filter(el => el.title && el.description)
                    }}>Добавить</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});

export default CreateDevice;