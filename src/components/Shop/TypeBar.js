import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from 'react-router-dom'
import {SHOP_ROUTE} from "../../utils/consts";
import './Shop.css'
import {Box, Typography} from "@mui/material";


const TypeBar = observer(() => {
    const {device} = useContext(Context)
    const location = useLocation();


    return (

            <ListGroup  className={'listGroup'}>
                <Box sx={{fontWeight: '700'}} >
                    <Typography style={{fontWeight: '700', textTransform: 'uppercase',}} gutterBottom={true} variant={'h6'}>
                        Категории:
                    </Typography>
                </Box>

                {device.BrandInType?.map(type =>
                    <NavLink activeStyle={{
                        fontWeight: "bold",
                        textDecoration: 'underline',
                        minHeight: '2rem',
                        color: '#1976d2',

                    }} key={type.name} to={SHOP_ROUTE + '/' + type.name}

                             style={{cursor: 'pointer', position: 'static', color: 'black', padding: '13px 0px'}}
                        // active={device.SelectedType === type.name}
                    >
                        <Typography variant={'body1'}>
                            {type.name}
                        </Typography>
                    </NavLink>
                )}

                { device.IsLoadDevices && <div className={'fencing'}>

                </div>}
            </ListGroup>



    );
});

export default TypeBar;