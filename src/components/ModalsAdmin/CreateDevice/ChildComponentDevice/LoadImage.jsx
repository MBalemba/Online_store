import React, {useEffect, useState} from 'react';
import {DivImg, Img,} from "../CreateDeviceElement";
import {Button, Form, FormControl, Image, InputGroup, Tab, Tabs} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const LoadImage = observer(({createDevice, onFileUpload}) => {

    function onFileUpload(e) {
        if (!createDevice.Image) {
            createDevice.setImg(e.target.files[0]);
        }
        console.log(createDevice.Img);
    }

    const [link, setLink] = useState('')
    const [statusLinkLoad , setClick] = useState({click: false, isLoad: false})
    useEffect(() => {

    }, [link])

    return (
        <>
            <hr/>
            <Tabs
                defaultActiveKey={"Загрузить ссылку"}
                className="mb-3"
            >
                <Tab  eventKey="Загрузить ссылку" title="Загрузить ссылку">
                    <InputGroup className="mb-3">
                        <FormControl
                            disabled={statusLinkLoad.click}
                            placeholder={"Ссылка на изображение"}
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            aria-label={"button-addon2"}
                            aria-describedby={"basic-addon2"}
                        />
                        <Button onClick={() => setClick({click: true, isLoad: false})} disabled={!link || statusLinkLoad.click} style={{borderRadius: 0}}
                                variant="outline-secondary" id="button-addon2">
                            Применить
                        </Button>
                        <Button onClick={() => {
                            setClick({click: false, isLoad: false}); createDevice.SetLink(null)}} disabled={!statusLinkLoad.click}
                                style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}} variant="outline-secondary"
                                id="button-addon2">
                            изменить
                        </Button>
                    </InputGroup>

                    <div style={{ height:"auto"}} className={'mt-2 mb-2 '}>
                        {statusLinkLoad.click &&
                        <Img  onLoad={(e) => {
                            setClick({click: true, isLoad: true})
                            createDevice.SetLink(link)
                        }} onError={() => {
                            setTimeout(()=>{setClick({click: false, isLoad: false}); setLink('')}, 1000)
                        }} alt={'Изображение не смогло загрузиться из источника, повторите попытку'}  src={link}/>
                        }
                        <h2 className={'ml-2'}>{(statusLinkLoad.isLoad )?'Изображение действительно':''}</h2>
                    </div>
                </Tab>



                <Tab eventKey="Загрузить изображение" title="Загрузить изображение">
                    {createDevice.Img
                        ? <DivImg url={window.URL.createObjectURL(createDevice.Img)} className={'mt-2 mb-2 '}>
                            <div style={{
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                borderRadius: '2%',
                                color: 'white',
                                width: ' 100%',
                                height: '40%',
                                padding: '2rem'
                            }} variant="secondary">
                                <h2 className={'ml-2'}>Файл выбран</h2>
                                <Button className={'ml-2'} onClick={() => createDevice.setImg(null)} size="lg"
                                        variant={'warning'}>Изменить загруженный файл</Button></div>
                        </DivImg>
                        :
                        <Form.Control
                            type={'file'}
                            onChange={onFileUpload}
                            className={'mt-3'}
                        />}
                </Tab>

            </Tabs>


            <hr/>
        </>
    );
});

export default LoadImage;