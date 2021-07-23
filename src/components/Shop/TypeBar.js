import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from 'react-router-dom'
import {SHOP_ROUTE} from "../../utils/consts";
import './Shop.css'

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    const location = useLocation();


    return (

            <ListGroup className={'listGroup'} style={{backgroundColor: 'rgba(0,0,0,0.03)'}}>
                {device?.BrandInType?.map(type =>
                    <NavLink activeStyle={{
                        fontWeight: "bold",
                        color: "white",
                        backgroundColor: '#007bff',
                        minHeight: '2rem',

                    }} key={type.name} to={SHOP_ROUTE + '/' + type.name}

                             style={{cursor: 'pointer', position: 'static', padding: '13px 20px'}}
                        // active={device.SelectedType === type.name}
                    >
                        {type.name}
                    </NavLink>
                )}

                { device.IsLoadDevices && <div className={'fencing'}>

                </div>}
            </ListGroup>



    );
});

export default TypeBar;