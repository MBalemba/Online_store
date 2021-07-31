import React, {useContext, useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import DeviceItem from "./DeviceItem";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {DotLoader, FadeLoader, MoonLoader, PacmanLoader} from "react-spinners";

const DeviceList = observer(() => {
    const {device} = useContext(Context)
    const history = useHistory()
    const {type: typeUrl} = useParams();
    const {search} = useLocation();
    console.log('search: ', search)


    useEffect(()=>{
        device.setCurrentPage(1)
    },[typeUrl])

    useEffect(()=>{
        if(typeUrl){
            device.toggleStatusLoadDevices(true)
            device.setPropertyFromUri(search)
            device.setDevices(typeUrl).then(
                ()=>{
                }

            ).catch(
                (r)=>{
                    device.cleanSelectedBrands()
                    device.setCurrentPage(1)
                    history.push(`/home`)
                }
            ).finally(()=>{
                setTimeout(()=>{device.toggleStatusLoadDevices(false)}, 1000)
            })
        } else {
            device.returnToInitialState()
        }
    }, [search, typeUrl])




    return (<>

            {typeUrl &&
                <Row className={'d-flex mt-3 mb-3'}>

                    {
                        device.IsLoadDevices
                            ?
                            <div style={{margin:'auto', height: '70vh', display: 'flex', alignItems: 'center'}}>
                                <MoonLoader color={'#007bff'}/>
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