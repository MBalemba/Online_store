import React, {useContext} from 'react';
import {Dropdown} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import CreateDeviceStore from "../../../store/CreateDeviceStore";



const Dropdowns = observer(({createDevice}) => {
    const {device} = useContext(Context)
    return (
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Dropdown  style={{width: '48%'}} className={"mt-2 mb-2 "}>
                    <Dropdown.Toggle style={{width: '100%'}}>{createDevice.Type || 'Выберете тип'}></Dropdown.Toggle>
                    <Dropdown.Menu style={{width: '100%'}}>
                        {device.BrandInType.map(type =>
                            <Dropdown.Item
                                onClick={() => createDevice.setType(type.name)}
                                key={type.name}>
                                {type.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>

                {createDevice.Type ?
                    <Dropdown  style={{width: '48%'}} className={"mt-2 mb-2"}>
                        <Dropdown.Toggle style={{width: '100%'}}>{createDevice.Brand || 'Выберете бренд'}></Dropdown.Toggle>
                        <Dropdown.Menu style={{width: '100%'}}>
                            {device.BrandInType.filter(unit => unit.name === createDevice.Type).map(({brandDTOS}) => {
                                    return brandDTOS.map(brand => <Dropdown.Item
                                        onClick={() => createDevice.setBrand(brand)}
                                        key={brand}>
                                        {brand}
                                    </Dropdown.Item>)
                                }
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    :
                    ''
                }

            </div>
    );
});

export default Dropdowns;