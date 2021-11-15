import React, {Component, useContext, useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import TypeBar from "../../components/Shop/TypeBar";
import SettingsBar from "../../components/Shop/SettingsBar/SettingsBar";
import DeviceList from "../../components/Shop/DeviceList/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import MyPagination from "../../components/Shop/Pagination";
import '../general.css'
import './Slider.css'
import {Button, Container, Grid, makeStyles, Paper} from "@material-ui/core";
import {Gallery} from "../../utils/gallery";
import {styled} from '@material-ui/core/styles';
import {BiLeftArrow, BiRightArrow, BsDot} from "react-icons/all";
import Slider from "./Slider";
import {useHistory, useLocation, useParams} from "react-router-dom";
import MainShop from "../../components/Shop/MainShop/MainShop";


const useStyles = makeStyles((theme) => ({
        container: {
            marginTop: '70px'
        },
    })
)


const Shop = observer(() => {
    const {device, user, taskInstance} = useContext(Context)
    const {type: typeUrl} = useParams();
    const history = useHistory()
    const {search} = useLocation();


    useEffect(() => {

            function doRequest() {
                device.setDevices(typeUrl).then(
                    () => {

                    }
                ).catch(
                    (response) => {


                        // /* user.checkStatus(response.status, response.info).then(() => {
                        //
                        //  })*/


                        if (response.data.status === 400) {
                            taskInstance.createTask(response.data.info, 'Warning')
                            device.cleanSelectedBrands(typeUrl)
                            device.returnPriceRangeToInitial()
                            device.setCurrentPage(1)
                            history.push(`/home`)
                            return
                        }
                        if (response.status === 500) {

                            user.checkRefresh().then(() => {
                                device.cleanSelectedBrands(typeUrl)
                                device.returnPriceRangeToInitial()
                                device.setCurrentPage(1)
                                doRequest()
                            }).catch(() => {
                                doRequest()
                            })
                            return
                        }
                        taskInstance.createTask(response.data.info, 'Warning')
                        device.cleanSelectedBrands(typeUrl)
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


            device.setBrandInType().then((answer) => {
                if (typeUrl) {

                    device.toggleStatusLoadDevices(true)
                    device.setPropertyFromUri(search, typeUrl)
                    doRequest()
                } else {
                }
            })

            return () => {
                device.toggleStatusLoadDevices(true)
            }


        }
        , [])

    return (
        <Container>
            {typeUrl ?
                <Grid container spacing={7}>
                    <Grid item md={3}>
                        <TypeBar/>
                        <SettingsBar/>
                    </Grid>
                    <Grid item md={9}>
                        {/*<SettingsBar/>*/}
                        <DeviceList/>
                        {!device.IsLoadDevices &&<MyPagination/>}

                    </Grid>

                </Grid> :
                <MainShop/>
            }
        </Container>
    );
}
);

export default Shop;