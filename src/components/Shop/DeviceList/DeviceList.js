import React, {useContext, useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import DeviceItem from "./DeviceItem";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {DotLoader, FadeLoader, MoonLoader, PacmanLoader} from "react-spinners";

const DeviceList = observer(() => {
    const {device, taskInstance} = useContext(Context)
    const history = useHistory()
    const {type: typeUrl} = useParams();
    const {search} = useLocation();
    console.log('search: ', search)




    useEffect(()=>{
        device.setCurrentPage(1)
    },[typeUrl])

    useEffect(()=>{
        debugger

        function doRequest() {
            device.setDevices(typeUrl).then(
                ()=>{
                }

            ).catch(
                (info)=>{
                    debugger
                        taskInstance.createTask(info, 'Warning')
                        device.cleanSelectedBrands()
                        device.returnPriceRangeToInitial()
                        device.setCurrentPage(1)
                        history.push(`/home/${typeUrl}`)
                        doRequest()
                        // device.cleanSelectedBrands()
                        // device.setCurrentPage(1)
                        // taskInstance.createTask(info, 'Warning')
                        // history.push(`/home`)
                }
            ).finally(()=>{
                setTimeout(()=>{device.toggleStatusLoadDevices(false)}, 1000)
            })
        }

        if(typeUrl){
            device.toggleStatusLoadDevices(true)
            device.setPropertyFromUri(search)
            // device.setDevices(typeUrl).then(
            //     ()=>{
            //     }
            //
            // ).catch(
            //     (info)=>{
            //         debugger
            //         if('' || '' || '' || '' || '' || ''){
            //             taskInstance.createTask(info, 'Warning')
            //         }else{
            //             device.cleanSelectedBrands()
            //             device.setCurrentPage(1)
            //             taskInstance.createTask(info, 'Warning')
            //             history.push(`/home`)
            //         }
            //
            //     }
            // ).finally(()=>{
            //     setTimeout(()=>{device.toggleStatusLoadDevices(false)}, 1000)
            // })
            doRequest()
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