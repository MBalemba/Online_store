import React, {useContext, useState} from 'react';
import {Badge, Button, FormControl, InputGroup, Tab} from "react-bootstrap";
import {Img} from "../../CreateDeviceElement";
import {createDevice} from "../../../../../pages/Admin";
import {observer} from "mobx-react-lite";
import {ClockLoader} from "react-spinners";
import {AiOutlineEnter} from "react-icons/all";

const LoadImageLink = observer(() => {

    const [link, setLink] = useState('')
    const [statusLinkLoad, setClick] = useState({click: false, isLoad: false})


    console.log('Link', createDevice.Link)


    return (
        <>
            <InputGroup className="mb-3">
                <FormControl
                    disabled={statusLinkLoad.click}
                    placeholder={"Ссылка на изображение"}
                    value={link}
                    onChange={(e) => {
                        setLink(e.target.value)
                    }}
                    onKeyDown={(e)=>{
                        if (e.keyCode === 13) {
                            setClick({click: true, isLoad: false})
                            createDevice.setLink(link)
                        }
                    }}
                />
                <Button onClick={() => {
                    setClick({click: true, isLoad: false})
                    createDevice.setLink(link)
                }}
                        disabled={!link || statusLinkLoad.click} style={{borderRadius: 0}}
                        variant="outline-secondary" id="button-addon2">
                    Применить
                    <Badge bg="primary"><AiOutlineEnter size={'1rem'} color={'#007bff'}/></Badge>
                </Button>
                <Button onClick={() => {
                    setClick({click: false, isLoad: false});
                    createDevice.setLink(null)
                }} disabled={!statusLinkLoad.click || !statusLinkLoad.isLoad}
                        style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}} variant="outline-secondary"
                        id="button-addon2">
                    изменить
                </Button>
            </InputGroup>

            <div style={{height: "auto"}} className={'mt-2 mb-2 '}>

                {statusLinkLoad.click &&
                <Img
                    alt={'Изображение не смогло загрузиться из источника, повторите попытку'}
                    src={'' + createDevice.Link}
                    disp={statusLinkLoad.click && statusLinkLoad.isLoad}

                    onLoad={(e) => {
                        setClick({click: true, isLoad: true})
                        createDevice.setLink(link)
                    }
                    }

                    onError={(e) => {

                        setClick({click: true, isLoad: false})
                        createDevice.setLink(null)
                        setTimeout(() => {
                            setClick({click: false, isLoad: false});
                            setLink('')
                        }, 2000)
                    }
                    }
                />
                }

                <div  style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                    <h2 className={'ml-2 ml-2'}>{(statusLinkLoad.isLoad) ? 'Изображение загружено' : (statusLinkLoad.click ? 'Изображение не действительно' : '')}</h2>
                    {!statusLinkLoad.isLoad && statusLinkLoad.click && <ClockLoader size={40}/>}
                </div>

            </div>
        </>

    );
});

export default LoadImageLink;