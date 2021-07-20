import React, {useEffect, useState} from 'react';
import {DivImg, Img,} from "../../CreateDeviceElement";
import {Button, Form, FormControl, Image, InputGroup, Tab, Tabs} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import LoadImageLink from "./LoadImageLink";
import LoadImageLocal from "./LoadImageLocal";

const LoadImage = observer(({createDevice, onFileUpload}) => {

    return (
        <>
            <hr/>
            <Tabs
                defaultActiveKey={"Загрузить ссылку"}
                className="mb-3"
            >

                <Tab eventKey="Загрузить ссылку" title="Загрузить ссылку">
                    <LoadImageLink />
                </Tab>

                <Tab eventKey="Загрузить изображение" title="Загрузить изображение">
                    <LoadImageLocal createDevice={createDevice}/>
                    <hr/>
                </Tab>

            </Tabs>


            <hr/>
        </>
    );
});

export default LoadImage;