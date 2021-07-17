import React from 'react';
import {Div} from "./CreateDeviceElement";
import {Button, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const LoadImage = observer(({createDevice, onFileUpload}) => {

    function onFileUpload(e) {
        if (!createDevice.Image) {
            createDevice.setImg(e.target.files[0]);
        }
        console.log(createDevice.Img);
    }

    return (
        <>
            <hr/>

            {createDevice.Img
                ?<Div url={window.URL.createObjectURL(createDevice.Img)} className={'mt-2 mb-2 '}>
                    <div style={{backgroundColor: 'rgba(0,0,0,0.5)',borderRadius: '2%', color: 'white', width: ' 100%', height: '40%', padding: '2rem'}} variant="secondary" >
                        <h2 className={'ml-2'}>Файл выбран</h2>
                        <Button className={'ml-2'} onClick={()=>createDevice.setImg(null)} size="lg" variant={'warning'}>Изменить загруженный файл</Button></div>
                </Div>
                :
                <Form.Control
                    type={'file'}
                    onChange={onFileUpload}
                    className={'mt-3'}
                />}

            <hr/>
        </>
    );
});

export default LoadImage;