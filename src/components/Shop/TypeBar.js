import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {NavLink, useHistory} from 'react-router-dom'
import {SHOP_ROUTE} from "../../utils/consts";
import {toJS} from "mobx";

const TypeBar = observer(() => {
    const history = useHistory();
    const {device} = useContext(Context)

    console.log((device.BrandInType))

    return (
        <ListGroup >
            {device?.BrandInType?.map(type =>
                <NavLink key={type.name} to={SHOP_ROUTE+'/'+type.name}>
                    <ListGroup.Item
                        onClick={()=>device.setSelectedType(type.name)}
                        style={{cursor: 'pointer'}}
                        active={device.SelectedType === type.name}
                        >
                        {type.name}
                    </ListGroup.Item>
                </NavLink>
            )}
        </ListGroup>
    );
});

export default TypeBar;