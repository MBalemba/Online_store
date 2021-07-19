import React, {useContext} from 'react';
import {Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import CreateDeviceStore from "../../../../store/CreateDeviceStore";



const NameAndPriceInput = observer(({createDevice}) => {

    return (
        <div>
            <Form.Control
                className={'mt-3'}
                value={createDevice.Name || ''}
                onChange={(e) =>
                    createDevice.setName(e.target.value)}
                placeholder={'Введите название устройства'}/>

            <Form.Control
                type={'number'}
                value={createDevice.Price || ''}
                onChange={(e) =>{

                    createDevice.setPrice(e.target.value)}
                }
                className={'mt-3'}
                placeholder={'Введите цену'}/>
        </div>
    );
});

export default NameAndPriceInput;