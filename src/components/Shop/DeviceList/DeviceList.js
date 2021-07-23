import React, {useContext, useEffect} from 'react';
import {Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import DeviceItem from "./DeviceItem";
import {useLocation, useParams} from "react-router-dom";

const DeviceList = observer(() => {
    const {device} = useContext(Context)
    const {type: typeUrl} = useParams();
    console.log(typeUrl)

    useEffect(()=>{
        console.log('render')
    })
    return (<>

            {typeUrl ? <Row className={'d-flex'}>
                {device.Devices.map(device=>
                    <DeviceItem key={device.id} device={device}/>
                )}
            </Row>: ''}

        </>
    );
})

export default DeviceList;