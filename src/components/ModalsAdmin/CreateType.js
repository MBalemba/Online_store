import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {postType} from "../../http/UserApi";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const CreateType = observer(({show, onHide}) => {
    const [typeValue, setTypeValue] = useState('')
    const {taskInstance, device, user} = useContext(Context)
    function add() {
        postType(typeValue.trim()).then((r)=>{
            onHide()
            taskInstance.createTask('Тип добавлен', 'success')
            setTypeValue('')
            device.setBrandInType()
        }). catch(
            ({response})=>{

                if('Such Type already exits' === response.data.info){
                    taskInstance.createTask('Ошибка, возможно такой тип уже существует', 'warning')
                    return
                }
                if(response.data.status === 468){

                    user.checkRefresh().then(()=>{
                        add()
                    })
                }


            }
        )
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
                        <Form.Control
                        placeholder={'Введите название типа'}
                        value={typeValue}
                        onChange={(e)=>setTypeValue(e.target.value)}
                        >

                        </Form.Control>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
                    <Button disabled={typeValue.trim()===''} variant={'outline-success'} onClick={add}>Добавить</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});

export default CreateType;