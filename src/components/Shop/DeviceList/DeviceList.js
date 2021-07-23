import React, {useContext, useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import DeviceItem from "./DeviceItem";
import {useLocation, useParams} from "react-router-dom";
import {DotLoader, FadeLoader, PacmanLoader} from "react-spinners";

const DeviceList = observer(() => {
    const {device} = useContext(Context)
    const {type: typeUrl} = useParams();
    const {search} = useLocation();

    useEffect(()=>{

        if(typeUrl){
            device.toggleStatusLoadDevices(true)
            device.setQueryString(typeUrl, search)
            device.setDevices(typeUrl).then(
                ()=>{
                    device.toggleStatusLoadDevices(false)
                }

            ).catch(
                (r)=>{ alert(r)}
            )
        }
    }, [search, typeUrl])

    return (<>

            {typeUrl &&
                <Row className={'d-flex'}>

                    {
                        device.IsLoadDevices
                            ?
                            <div style={{margin:'auto', height: '70vh', display: 'flex', alignItems: 'center'}}>
                                <PacmanLoader color={'#007bff'}/>
                            </div>
                            :
                            device.Devices.map(device=>
                                <DeviceItem key={device.id} device={device}/>
                            )
                    }
            </Row>}

        </>
    );
})

export default DeviceList;