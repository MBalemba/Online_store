import React, {createContext, useContext, useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/ModalsAdmin/CreateBrand";
import CreateType from "../components/ModalsAdmin/CreateType";
import CreateDevice from "../components/ModalsAdmin/CreateDevice/CreateDevice";
import CreateDeviceStore from "../store/CreateDeviceStore";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const createDevice = new CreateDeviceStore()


const Admin = observer(() => {
    const {device} = useContext(Context)

    const [brandVisible,setBrandVisible] = useState(false)
    const [typeVisible,setTypeVisible] = useState(false)
    const [deviceVisible,setDeviceVisible] = useState(false)

    useEffect(()=>{
            device.setBrandInType()
        }
    , [])

    return (
        <Container className={'d-flex flex-column align-items-start mt-5'}>
            <Button onClick={()=> setTypeVisible(true)} className={'mt-2'}  variant={"outline-dark"}>
                Добавить тип
            </Button>
            <Button onClick={()=> setBrandVisible(true)} className={'mt-2'} variant={"outline-dark"}>Добавить бренд</Button>
            <Button onClick={()=> setDeviceVisible(true)} className={'mt-2'} variant={"outline-dark"}>
                Добавить устройста
            </Button>

            <CreateBrand show={brandVisible} onHide={()=> setBrandVisible(false)}/>
            <CreateType show={typeVisible} onHide={()=> setTypeVisible(false)}/>
            <CreateDevice createDevice={createDevice} show={deviceVisible} onHide={()=> setDeviceVisible(false)}/>
        </Container>
    );
});

export default Admin;