import React, {useContext, useState} from 'react';
import {DivImg} from "../../CreateDeviceElement";
import {Button, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../../index";

const LoadImageLocal = observer(({Img, getFileImg}) => {
    const {taskInstance} = useContext(Context)
    const [drag, setDrag] = useState(false)
    const ref = React.createRef()

    function onFileUpload(e) {
        if(IsvalideFormatLoadingFile(e.target.files[0])){
            getFileImg(e.target.files[0]);
        } else{
            taskInstance.createTask('Недопустимый формат', 'warning')
        }
    }





    function buttonStyledOn() {
        ref.current.style.cssText = `
                            color: white;
                            background-color: #007bff;
                            `;

    }

    const buttonStyledOff = () => {
        ref.current.style.cssText = ``;
    }

    function dragStart(e) {
        e.preventDefault()
        buttonStyledOn()
        setDrag(true)
    }

    function dragLeave(e) {
        e.preventDefault()
        buttonStyledOff()
        setDrag(false)
    }

    function dragOver(e) {
        e.preventDefault()
    }

    function IsvalideFormatLoadingFile(file){

        if(file.type==='image/jpeg'
            || file.type==='image/pjpeg'
            || file.type==='image/png'
            || file.type==='image/tiff'
            || file.type==='image/vnd.wap.wbmp'
            || file.type==='image/webp') {
            return true
        } else {
            return false
        }
    }

    function dragDrop(e) {
        e.preventDefault()
        let files = [...e.dataTransfer.files]
        if(files.length>1){
            taskInstance.createTask('Можно загрузить только одну картинку', 'warning')
        } else if (files.length ===1){
            const file = files[0]

            if(IsvalideFormatLoadingFile(file)){
                getFileImg(file)
            } else{
                taskInstance.createTask('Недопустимый формат', 'warning')
            }
        }
    }

    return (
        <>
            {Img
                ? <DivImg url={window.URL.createObjectURL(Img)} className={'mt-2 mb-2 '}>
                    <div style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        borderRadius: '2%',
                        color: 'white',
                        width: ' 100%',
                        height: '40%',
                        padding: '2rem'
                    }} variant="secondary">
                        <h2 className={'ml-2'}>Файл выбран</h2>
                        <Button className={'ml-2'} onClick={() => getFileImg(null)} size="lg"
                                variant={'warning'}>Изменить загруженный файл</Button></div>
                </DivImg>
                :
                <>
                    <Form.Control
                        type={'file'}
                        style={{display: 'none'}}
                        id={'input_Image'}
                        onChange={onFileUpload}
                        className={'mt-3'}
                    />

                    <label
                        onMouseEnter={buttonStyledOn}
                        onMouseLeave={buttonStyledOff}
                        style={{
                            borderRadius: '2rem',
                            border: `2px dashed ${drag ? '#007bff' : '#6c757d'}`,
                            width: '80% ',
                            position: 'relative',
                            margin: '0 auto',
                            height: '400px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: ' center'

                        }}
                        htmlFor="input_Image"


                    >
                        <div style={{
                            display: 'flex',
                            position: "absolute",
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: ' center'
                        }}>
                            <Button ref={ref} size="lg" variant="outline-primary">Загрузите изображение</Button>
                            <h6 className={'mt-2'}>{drag ? 'Бросьте файл' : 'Или перетащите сюда'}</h6>
                        </div>

                        <div style={{
                            position: "absolute",
                            height: '100%',
                            width: '100% ',
                            margin: '0 auto',
                            cursor: 'pointer'
                        }}
                             onDragEnter={dragStart}
                             onDragLeave={dragLeave}
                             onDragOver={dragOver}
                             onDrop={dragDrop}
                        >
                        </div>

                    </label>
                </>
            }

        </>
    );
});

export default LoadImageLocal;