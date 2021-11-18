import React, {useContext, useEffect} from 'react';
import bigStar from '../../assets/svg/starBig.svg'
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useHistory, useParams} from "react-router-dom";
import {toJS} from "mobx";
import '../general.css'
import {Box, Container, Grid} from "@material-ui/core";
import {Accordion, AccordionDetails, AccordionSummary, Button, Paper, Rating, Typography} from "@mui/material";
import OneDeviceStore from "./OneDeviceStore";
import {ButtonBasket} from "../../components/Common/CardProduct/CardProduct";
import './DevicePage.css'
import {makeStyles} from "@material-ui/styles";
import ModalDevice from "./ComponentsForAdmin/ModalDeviceEdit";
import {SHOP_ROUTE} from "../../utils/consts";
import AlertDialog from "../../components/Common/AlertDialog/alert";


const store = new OneDeviceStore()


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


const DevicePage = observer(() => {
        const classes = useStyles()
        let history = useHistory()
        const [open, setOpen] = React.useState(false);

        const [isDeleteDialogOpen, changeIsDeleteDialogOpen] = React.useState(false)

        const {user, taskInstance} = useContext(Context)
        const {id} = useParams()
        const item = store.Device


        function dialogClose(status){
            changeIsDeleteDialogOpen(false)
            if(status){
                deleteDeviceHandler()
            }
        }

        function fishingData(dataObj) {


            function doEditDevices(data) {
                store.editInfoDevice(data, taskInstance)
                    .then(() => {
                        setOpen(false)
                        giveDeviceInfo()

                    })
                    .catch((resp) => {
                        user.checkStatus(resp.status, resp.info).then(() => {
                            doEditDevices(data)
                        })
                    })
            }

            doEditDevices(dataObj)


        }

        function giveDeviceInfo() {
            store.giveInfoDevice(id).then(() => {

            }).catch((err) => {
                if (err) {
                    history.push(`${SHOP_ROUTE}`)
                }
            })
        }

        useEffect(() => {
            giveDeviceInfo()
        }, [])


        function deleteDeviceHandler() {

            function deleteDevice() {
                store.deleteCard()
                    .then((type) => {
                        store.toInitial()
                        history.push('/home')
                    })
                    .catch((resp) => {
                        user.checkStatus(resp.status, resp.info).then(() => {
                            deleteDevice()
                        })
                    })
            }

            deleteDevice()
        }

        return (
            <Container>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        <Grid item md={6}>

                            <Box
                                sx={{
                                    width: '100%',
                                    height: 500,
                                }}
                            >
                                <img style={{objectFit: 'contain',}} width={'100%'} height={'100%'}
                                     src={!item.isName ? item.pathFile : (process.env.REACT_APP_API_URL + 'takeImage/' + item.pathFile)}/>
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Typography gutterBottom variant={'h5'}>{item.name}</Typography>
                            <Grid container spacing={2}>
                                <Grid item md={6}>
                                    <Rating name="read-only" value={item.ratings} readOnly/>
                                </Grid>
                                <Grid item md={6}>
                                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                        {Number(item.price).toLocaleString() + ' '} ₽
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box sx={{width: '331px', marginTop: '10px'}}>
                                <ButtonBasket id={item.id} price={item.price} classCust={''}/>
                            </Box>


                            {item.device_infoResponseModels.length !== 0 && <Paper>
                                <Box sx={{width: '100%', marginTop: '40px', padding: '20px 10px 10px'}}>
                                    <Typography gutterBottom variant={'h4'}>
                                        {'Характеристики'}
                                    </Typography>

                                    <Box sx={{width: '100%'}}>
                                        {item.device_infoResponseModels.map((el, index) =>
                                            <Box key={el.id} sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '10px',
                                            }}>
                                                <Box sx={{fontWeight: '700'}}>
                                                    <Typography variant={'body1'}>
                                                        {el.title}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{}}>
                                                    <Typography variant={'body2'}>
                                                        {el.description}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            </Paper>}


                        </Grid>
                    </Grid>
                </Box>


                {user._isAuthAdmin && <Box sx={{marginTop: '20px'}}>
                    <Accordion>
                        <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Box sx={{padding: '0 10px 0'}}>
                                <Typography variant={'h5'}>Для Админа</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>

                            <Grid className={classes.root} container spacing={3}>
                                <Grid item xs={4}>

                                    <Button onClick={() => setOpen(true)} size={'large'} variant="outlined" color="primary">
                                        Редактировать карточку
                                    </Button>

                                </Grid>
                                <Grid item xs={4}>

                                    <Button onClick={()=>changeIsDeleteDialogOpen(true)} variant="outlined" size={'large'} color="primary">Удалить
                                        карточку</Button>

                                </Grid>

                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Box>}


                <ModalDevice info={item} edit open={open} setOpen={setOpen} fishingData={fishingData}
                             isLoading={store.isEditDeviceProcess}/>

                <AlertDialog callback={dialogClose} questionText={'Вы действительно хотите удалить устройство'} isOpen={isDeleteDialogOpen} />

            </Container>
        );
    }
);

export default DevicePage;