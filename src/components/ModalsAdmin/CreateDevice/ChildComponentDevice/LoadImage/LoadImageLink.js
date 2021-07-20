import React, {useContext, useState} from 'react';
import {Button, FormControl, InputGroup, Tab} from "react-bootstrap";
import {Img} from "../../CreateDeviceElement";
import {createDevice} from "../../../../../pages/Admin";

const LoadImageLink = () => {

    const [link, setLink] = useState('')
    const [statusLinkLoad, setClick] = useState({click: false, isLoad: false})

    return (
        <>
            <InputGroup className="mb-3">
                <FormControl
                    disabled={statusLinkLoad.click}
                    placeholder={"Ссылка на изображение"}
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    aria-label={"button-addon2"}
                    aria-describedby={"basic-addon2"}
                />
                <Button onClick={() => setClick({click: true, isLoad: false})}
                        disabled={!link || statusLinkLoad.click} style={{borderRadius: 0}}
                        variant="outline-secondary" id="button-addon2">
                    Применить
                </Button>
                <Button onClick={() => {
                    setClick({click: false, isLoad: false});
                    createDevice.SetLink(null)
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
                    src={link}
                    disp={statusLinkLoad.click && statusLinkLoad.isLoad}

                    onLoad={(e) => {
                        setClick({click: true, isLoad: true})
                        createDevice.SetLink(link)
                    }
                    }
                    onError={(e) => {
                        setClick({click: true, isLoad: false})
                        // setTimeout(() => {
                        //     setClick({click: false, isLoad: false});
                        //     setLink('')
                        // }, 1000)
                    }
                    }
                />
                }

                <h2 className={'ml-2'}>{(statusLinkLoad.isLoad) ? 'Изображение загружено' : (statusLinkLoad.click ? 'Изображение не действительно' : '')}</h2>
            </div>
        </>

    );
};

export default LoadImageLink;