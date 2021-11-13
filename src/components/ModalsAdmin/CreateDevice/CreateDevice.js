import React, {createContext, useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {Context, taskInstance, user} from "../../../index";
import {observer} from "mobx-react-lite";
import Dropdowns from "./ChildComponentDevice/Dropdowns.jsx";
import NameAndPriceInput from "./ChildComponentDevice/NameAndPriceInput.jsx";
import LoadImage from "./ChildComponentDevice/LoadImage/LoadImage";



const CreateDeviceContainer = observer(({show, onHide, createDevice}) => {
    const {device, user, taskInstance} = useContext(Context)
    const [info, setInfo] = useState([])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now(),}])
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
                        <Button variant={'outline-success'} onClick={(event) => {
                            let characteristic = info.filter(el => el.title && el.description).map(el=>({title: el.title, description: el.description }))
                            if(createDevice.IsGetReadyToRequest()){
                                 createDevice.giveSomeDataToServer(characteristic, taskInstance)
                                     .then(()=>{

                                     })
                                     .catch((response)=>{
                                         if(response.status === 468) {

                                             if (response.data.message !== 'Maximum upload size exceeded; nested exception is java.lang.IllegalStateException: org.apache.tomcat.util.http.fileupload.impl.FileSizeLimitExceededException: The field imgFile exceeds its maximum permitted size of 1048576 bytes.') {

                                                 user.checkRefresh().then(()=>{

                                                     event.target.click()
                                                 })
                                             }
                                         }

                                         if(response.status === 403){
                                             user.Out()
                                             taskInstance.createTask('Регистрируйся разбойник, что ты тут делаешь', 'Warning' )
                                         }


                                     })
                            } else {
                                taskInstance.createTask('Заполненны не все данные', 'Warning')
                            }
                            // createDevice.deleteAll()
                            // setInfo([])


                        }}>Добавить</Button>
                    </Modal.Footer>
                </Modal>
            </div>
    );
});




export default CreateDeviceContainer;