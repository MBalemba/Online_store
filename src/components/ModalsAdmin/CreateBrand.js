import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const CreateBrand = ({show, onHide}) => {
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
                        >

                        </Form.Control>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
                    <Button variant={'outline-success'} onClick={onHide}>Добавить</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateBrand;