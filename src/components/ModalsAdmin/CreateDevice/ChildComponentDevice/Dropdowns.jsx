import React, {useContext, useEffect} from 'react';
import {Dropdown} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import CreateDeviceStore from "../../../../store/CreateDeviceStore";
import {CSSTransition} from "react-transition-group";
import './Dropdowns.css'
import {createDevice} from "../../../../pages/Admin";


const Dropdowns = observer(() => {
    const {device} = useContext(Context)
    useEffect(()=>{

    }, [createDevice.Brand])

    return (
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Dropdown  style={{width: '48%'}} className={"mt-2 mb-2 "}>
                    <Dropdown.Toggle style={{width: '100%'}}>{createDevice.Type || 'Выберете тип>'}</Dropdown.Toggle>
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



                <CSSTransition
                    in={Boolean(createDevice.Type)}
                    timeout={1000}
                    mountOnEnter={true}
                    unmountOnExit={true}
                >
                    {state => <Dropdown style={{width: '48%'}} className={`mt-2 mb-2 typeDropdown ${state}`}>
                        <Dropdown.Toggle style={{width: '100%'}}>{createDevice.Brand || 'Выберете бренд>'}</Dropdown.Toggle>
                        <Dropdown.Menu style={{width: '100%'}}>
                            {device.BrandInType.filter(unit => unit.name === createDevice.Type)[0].brands.map((el) => {
                                    return  <Dropdown.Item
                                        onClick={() => createDevice.setBrand(el.name)}
                                        key={el.id}>
                                        {el.name}
                                    </Dropdown.Item>
                                }
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    }

                </CSSTransition>

                {createDevice.Type ?
                    ''
                    :
                    ''
                }

            </div>
    );
});

export default Dropdowns;