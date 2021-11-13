import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {getTypeBrand, postBrand} from "../../http/UserApi";
import {Context} from "../../index";

const CreateBrand = ({show, onHide}) => {


    const {device, user, taskInstance} = useContext(Context)
    const [typeSelected, setTypeSelected] = useState(null)
    const [brandSelected, setBrandSelected] = useState('')

    function sendToServer() {
        postBrand({name: brandSelected.trim(), type: typeSelected}).then(()=>{
            setBrandSelected('')
            taskInstance.createTask('Успешно добавлен бренд', 'success')
            device.setBrandInType()
        }).catch(({response})=>{

            if(response.data.info === 'Such Brand of this Type already exist'){
                taskInstance.createTask('Возникла какая-то ошибка', 'Danger')
            }

            if(response.data.status === 468){

                user.checkRefresh().then(()=>{
                    sendToServer()
                })
            }


        })

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
                        Добавить новый бренд
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {typeSelected ?
                            <Form.Control
                                placeholder={'Введите название бренда'}
                                value={brandSelected}
                                onChange={(e)=> setBrandSelected(e.target.value)}
                            >

                            </Form.Control>
                            :
                            <p className="lead">&nbsp;&nbsp;&nbsp;&nbsp;Выберите тип техники, в который хотите добавить бренд:</p>
                        }

                        <Dropdown  style={{width: '100%'}} className={"mt-2 mb-2 "}>
                            <Dropdown.Toggle style={{width: '100%'}}>{typeSelected || 'Выберете тип>'}</Dropdown.Toggle>
                            <Dropdown.Menu style={{width: '100%'}}>
                                {device.BrandInType.map(type =>
                                    <Dropdown.Item
                                        onClick={() => setTypeSelected(type.name)}
                                        key={type.name}>
                                        {type.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>


                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
                    <Button disabled={!(brandSelected && typeSelected)} variant={'outline-success'} onClick={sendToServer}>Добавить</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateBrand;