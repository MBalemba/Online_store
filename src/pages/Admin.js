import React, {createContext, useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import CreateBrand from "../components/ModalsAdmin/CreateBrand";
import CreateType from "../components/ModalsAdmin/CreateType";
import CreateDevice from "../components/ModalsAdmin/CreateDevice/CreateDevice";
import CreateDeviceStore from "../store/CreateDeviceStore";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { toJS } from 'mobx'
import {Redirect} from "react-router-dom";
import './general.css'
import AdminOrderTable from "../components/ModalsAdmin/AdminOrderTable/AdminOrderTable";
import {Button, Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import DeleteBrand from "../components/ModalsAdmin/DeleteWindows/DeleteBrand/DeleteBrand";
import DeleteType from "../components/ModalsAdmin/DeleteWindows/DeleteType/DeleteType";


export const createDevice = new CreateDeviceStore()

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


const Admin = observer(() => {

    const classes = useStyles();

    const {device, user} = useContext(Context)

    const [brandVisible,setBrandVisible] = useState(false)
    const [typeVisible,setTypeVisible] = useState(false)
    const [deviceVisible,setDeviceVisible] = useState(false)
    const [deleteBrandVisible, setDeleteBrandVisible] = useState(false)
    const [deleteTypeVisible, setDeleteTypeVisible] = useState(false)

    useEffect(()=>{
            device.setBrandInType()
        }
    , [])

    if(!user.isAuthAdmin){
        return <Redirect to={''}/>
    }

    return (
        <Container className={'d-flex flex-column align-items-start mt-5'}>

            <Grid className={classes.root} container spacing={3}>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Button onClick={()=> setTypeVisible(true)} className={'mt-2'}  variant="outlined" color="primary">
                            Добавить тип
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Button onClick={()=> setBrandVisible(true)} className={'mt-2'} variant="outlined" color="primary">Добавить бренд</Button>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Button onClick={()=> setDeviceVisible(true)} className={'mt-2'} variant="outlined" color="primary">
                            Добавить устройста
                        </Button>
                    </Paper>
                </Grid>


                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Button onClick={()=> setDeleteTypeVisible(true)} className={'mt-2'} variant="outlined" color="primary">
                            Удалить и редакировать тип
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Button onClick={()=> setDeleteBrandVisible(true)} className={'mt-2'} variant="outlined" color="primary">
                            Удалить и редактировать бренд
                        </Button>
                    </Paper>
                </Grid>



            </Grid>





            <AdminOrderTable />


            <CreateBrand show={brandVisible} onHide={()=> setBrandVisible(false)}/>
            <CreateType show={typeVisible} onHide={()=> setTypeVisible(false)}/>
            <CreateDevice createDevice={createDevice} show={deviceVisible} onHide={()=> setDeviceVisible(false)}/>

            {deleteBrandVisible && <DeleteBrand show={deleteBrandVisible} onHide={()=> setDeleteBrandVisible(false)} />}
            {deleteTypeVisible && <DeleteType show={deleteTypeVisible} onHide={()=> setDeleteTypeVisible(false)} />}
        </Container>
    );
});

export default Admin;