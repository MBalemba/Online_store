import React, {useContext} from 'react';
import {Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import DeviceItem from "./DeviceItem";
import {useLocation} from "react-router-dom";

const DeviceList = observer(() => {
    const {device} = useContext(Context)

    return (
        <Row className={'d-flex'}>
            {device.Devices.map(device=>
                <DeviceItem key={device.id} device={device}/>
            )}
        </Row>
    );
})

export default DeviceList;