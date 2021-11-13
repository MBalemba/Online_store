import React from 'react';
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Divider,
    Fade,
    Grid,
    Modal,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Formik, Form as FormFormik, useField, useFormik, Field, ErrorMessage, Form, FieldArray} from 'formik';
import * as Yup from 'yup';
import NumberFormat from "react-number-format";
import MaskedInput from "react-text-mask/dist/reactTextMask";
import LoadImageLink, {PresentationComponentLoadLink} from "../../../components/ModalsAdmin/CreateDevice/ChildComponentDevice/LoadImage/LoadImageLink";
import LoadImageLocal from "../../../components/ModalsAdmin/CreateDevice/ChildComponentDevice/LoadImage/LoadImageLocal";
import {createDevice} from "../../Admin";
import {makeStyles} from "@material-ui/core";
import {GrClose} from "react-icons/all";


const useStyles = makeStyles((theme) => ({
        inputCategory: {
            width: '100%',
        },
        buttonClose: {
            width: '50px',
            height: '70px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    }
    )
)


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '90%',
    overflowY: 'auto',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const ModalDevice = ({edit = false, open, setOpen, info, fishingData, isLoading=false }) => {
    const classes = useStyles()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState(0);
    const [imgFile, setImgFile] = React.useState(null)
    const [link, setLink] = React.useState(null)



    const initialValues = {
        name: info.name,
        price: info.price,
        characteristic: [
            ...info.device_infoResponseModels
        ],

    }

    function toStateLink(link) {
        setLink(link)
    }

    function getFileImg(file) {
        setImgFile(file)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >

                <Fade in={open}>

                    <Box component={Paper}  sx={style}>

                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={isLoading}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Backdrop
                                open={isLoading}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        </Modal>



                        <Box sx={{display: 'flex', justifyContent: 'space-between',}}>
                            <Typography id="transition-modal-title" variant="h4" component="h2">
                                {edit && 'Редактирование девайса'}
                                {!edit && 'Добавление девайса'}
                            </Typography>

                            <Button onClick={handleClose}>
                                Закрыть
                            </Button>
                        </Box>

                        <Divider/>

                        <Box sx={{marginTop: '2rem'}}>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={Yup.object({
                                    name: Yup.string()
                                        .max(100, 'Must be 100 characters or less')
                                        .required('Required'),
                                    price: Yup.number().required('ошибка').positive().integer(),
                                    characteristic: Yup.array()
                                        .of(
                                            Yup.object().shape({
                                                title: Yup.string().required('Заполните или удалите'), // these constraints take precedence
                                                description: Yup.string().required('Заполните или удалите'), // these constraints take precedence
                                            })
                                        )

                                })}
                                onSubmit={(values, {setSubmitting}) => {

                                    let data = values
                                    if(link){
                                        data = {...data, imgRef: link}
                                    }

                                    if(imgFile){
                                        data = {...data, imgFile: imgFile}
                                    }


                                    fishingData(data)


                                }}
                            >
                                {({values, errors}) => (
                                    <Form>
                                        {/*{JSON.stringify(errors)}*/}
                                        <Box sx={{marginBottom: '1rem'}}>
                                            <InputDevice
                                                name={'name'}
                                                id={'name'}
                                                label="Название устройства"
                                                className={classes.inputCategory}
                                            />
                                        </Box>


                                        <Box sx={{marginBottom: '1rem'}}>
                                            <InputPriceDevice
                                                className={classes.inputCategory}
                                                label="Цена"
                                                name={'price'}
                                                id={'price'}
                                            />
                                        </Box>


                                        <Box>
                                            <Typography variant={'h5'}>
                                                Хотите изменить изображение, загрузите его
                                                <br/>
                                            </Typography>
                                            <Typography variant={'caption'}>не хотите не надо, мне нужен копирайтер, памагите</Typography>
                                        </Box>

                                        <Box sx={{width: '100%', marginBottom: '2rem'}}>
                                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                                <Tabs value={value} onChange={handleChange}
                                                      aria-label="basic tabs example">
                                                    <Tab onClick={()=>{setImgFile(null)} } label="Ссылка" {...a11yProps(0)} />
                                                    <Tab onClick={()=>{setLink(null)} } label="Локально" {...a11yProps(1)} />
                                                </Tabs>
                                            </Box>
                                            <TabPanel value={value} index={0}>
                                                <PresentationComponentLoadLink toStateLink ={toStateLink} Link={link}  />
                                            </TabPanel>
                                            <TabPanel value={value} index={1}>
                                                <LoadImageLocal getFileImg={getFileImg} Img={imgFile}/>
                                            </TabPanel>

                                        </Box>


                                        <Box>
                                            <Typography variant={'h5'}>
                                                Характеристики
                                            </Typography>
                                            <FieldArray name="characteristic">
                                                {({insert, remove, push}) => (
                                                    <Box sx={{width: '100%', margin: '10px'}}>
                                                        {values.characteristic?.length > 0 &&
                                                        values.characteristic.map((item, index) => (
                                                            <Box sx={{marginTop: '1rem'}} key={index}>
                                                                <Grid container spacing={2}>
                                                                    <Grid item md={4}>
                                                                        <InputDevice
                                                                            className={classes.inputCategory}
                                                                            name={`characteristic.${index}.title`}
                                                                            id={`characteristic.${index}.title`}
                                                                            label="Имя категории"
                                                                        />
                                                                    </Grid>
                                                                    <Grid item md={6}>
                                                                        <InputDevice
                                                                            className={classes.inputCategory}
                                                                            name={`characteristic.${index}.description`}
                                                                            id={`characteristic.${index}.description`}
                                                                            label="Значение"
                                                                        />
                                                                    </Grid>

                                                                    <Grid item md={1}>
                                                                        <Button
                                                                            className={classes.buttonClose}
                                                                            variant={'outlined'}
                                                                            onClick={() => remove(index)}
                                                                        >
                                                                            <GrClose />
                                                                        </Button>
                                                                    </Grid>

                                                                </Grid>
                                                            </Box>
                                                        ))}
                                                        <Box sx={{marginTop: '2rem', display: 'flex', justifyContent: 'flex-end'}}>
                                                            <Button
                                                                size={'medium'}
                                                                variant={'outlined'}
                                                                onClick={() => push({
                                                                    "description": "",
                                                                    "title": "",
                                                                })}
                                                            >
                                                                Добавить новое свойство
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                )}
                                            </FieldArray>
                                        </Box>
                                        <Divider/>

                                        <Box sx={{display:'flex', justifyContent: 'space-between', marginTop: '4rem'}}>
                                            <Button size={'large'} variant={"contained"} onClick={handleClose}>
                                                Отмена
                                            </Button>

                                            <Button  size={'large'} variant={'contained'} type={"submit"}>
                                                Редактировать
                                            </Button>
                                        </Box>

                                    </Form>
                                )}
                            </Formik>
                        </Box>


                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};


function InputDevice(props) {

    const [field, meta] = useField(props);

    return (
        <React.Fragment>
            <TextField
                error={meta.touched && meta.error}
                {...field}
                {...props}
                helperText={meta.error}
                variant="outlined"


            />
        </React.Fragment>

    )
}

function InputPriceDevice(data) {
    const [field, meta] = useField(data);


    return (
        <
            TextField
            error={meta.touched && meta.error}
            helperText={meta.error}
            variant="outlined"
            label="Цена"
            type={'number'}
            {...field}
            {...data}

        />
    )
}

export default ModalDevice;