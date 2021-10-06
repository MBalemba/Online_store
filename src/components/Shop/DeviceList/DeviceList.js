import React, {useContext, useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import DeviceItem from "./DeviceItem";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {DotLoader, FadeLoader, MoonLoader, PacmanLoader} from "react-spinners";

const DeviceList = observer(() => {
    const {device, user, taskInstance} = useContext(Context)
    const history = useHistory()
    const {type: typeUrl} = useParams();
    debugger
    const {search} = useLocation();
    console.log('search: ', search)


    useEffect(() => {
        device.setCurrentPage(1)
    }, [typeUrl])

    useEffect(() => {
        debugger

        function doRequest() {
            device.setDevices(typeUrl).then(
                () => {
                    debugger
                }
            ).catch(
                (response) => {
                    debugger
                    if (response.data.info === 'Devices with this type doesn\'t exists') {
                        taskInstance.createTask(response.data.info, 'Warning')
                        device.cleanSelectedBrands()
                        device.returnPriceRangeToInitial()
                        device.setCurrentPage(1)
                        history.push(`/home`)
                        return
                    }
                    if (response.status === 500){
                        user.checkRefresh().then(()=>{
                            device.cleanSelectedBrands()
                            device.returnPriceRangeToInitial()
                            device.setCurrentPage(1)
                            doRequest()
                        }).catch(()=>{
                            doRequest()
                        })
                        return
                    }
                    taskInstance.createTask(response.data.info, 'Warning')
                    device.cleanSelectedBrands()
                    device.returnPriceRangeToInitial()
                    device.setCurrentPage(1)
                    history.push(`/home/${typeUrl}`)
                    // device.cleanSelectedBrands()
                    // device.setCurrentPage(1)
                    // taskInstance.createTask(info, 'Warning')
                    // history.push(`/home`)
                }
            ).finally(() => {
                setTimeout(() => {
                    device.toggleStatusLoadDevices(false)
                }, 1000)
            })
        }

        if (typeUrl) {
            debugger
            device.toggleStatusLoadDevices(true)
            device.setPropertyFromUri(search)
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
                        <div style={{margin: 'auto', height: '70vh', display: 'flex', alignItems: 'center'}}>
                            <MoonLoader color={'#007bff'}/>
                        </div>
                        :
                        device.Devices.map(device =>
                            <DeviceItem key={device.id} device={device}/>
                        )
                }
            </Row>}
        </>
    );
})

export default DeviceList;