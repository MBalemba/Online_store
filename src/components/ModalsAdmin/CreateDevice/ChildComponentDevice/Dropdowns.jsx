import React, {useContext} from 'react';
import {Dropdown} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import CreateDeviceStore from "../../../../store/CreateDeviceStore";



const Dropdowns = observer(({createDevice}) => {
    const {device} = useContext(Context)

    console.log(device.BrandInType)
    return (
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Dropdown  style={{width: '48%'}} className={"mt-2 mb-2 "}>
                    <Dropdown.Toggle style={{width: '100%'}}>{createDevice.Type || 'Выберете тип'}></Dropdown.Toggle>
                    <Dropdown.Menu style={{width: '100%'}}>
                        {device.BrandInType.map(type =>
                            <Dropdown.Item
                                onClick={() =>{if(type.name!==createDevice.Type){
                                    createDevice.setType(type.name)
                                    createDevice.setBrand(null)
                                }
                                }}
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
                            {device.BrandInType.filter(unit => unit.name === createDevice.Type)[0].brandDTOS.map((el) => {
                                console.log(device.BrandInType)

                                    return  <Dropdown.Item
                                        onClick={() => createDevice.setBrand(el.name)}
                                        key={el.id}>
                                        {el.name}
                                    </Dropdown.Item>
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