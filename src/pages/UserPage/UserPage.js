import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import './UserPage.css'
import '../general.css'
import {MdAddAPhoto} from "react-icons/all";


const UserPage = () => {
    return (
        <Container className={'mt'}>
            <Row>
                <Col md={3}>
                    <div className={'avatarBlock'}>
                        <div className={'avatarBlock__img'}>
                            <div className={'avatarBlock__modalMenu'}>
                                <MdAddAPhoto />
                            </div>
                        </div>

                        <div className={'avatarBlock__nameBlock'}>
                            <h5>Королева</h5>
                            <h5>Анна</h5>
                            <h5>Николаевна</h5>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UserPage;