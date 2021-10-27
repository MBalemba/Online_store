import React from 'react';
import {Backdrop, Box, Button, Divider, Fade, Modal, TextField, Typography} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Formik, Form as FormFormik, useField, useFormik, Field, ErrorMessage, Form} from 'formik';
import * as Yup from 'yup';
import NumberFormat from "react-number-format";
import MaskedInput from "react-text-mask/dist/reactTextMask";
import LoadImageLink from "../../../components/ModalsAdmin/CreateDevice/ChildComponentDevice/LoadImage/LoadImageLink";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
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


const ModalDevice = ({edit = false, open, setOpen}) => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState('1');
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
                    <Box sx={style}>
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

                        <Box sx={{marginTop: '1rem'}}>
                            <Formik
                                initialValues={{nameDevice: '',}}
                                validationSchema={Yup.object({
                                    nameDevice: Yup.string()
                                        .max(15, 'Must be 15 characters or less')
                                        .required('Required'),
                                    priceDevice: Yup.number('Это должно быть число').required('пусто').positive().integer(),

                                })}
                                onSubmit={(values, {setSubmitting}) => {
                                    setTimeout(() => {
                                        alert(JSON.stringify(values, null, 2));
                                        setSubmitting(false);
                                    }, 400);
                                }}
                            >

                                <Form>
                                    <InputNameDevice
                                        name={'nameDevice'}
                                        id={'nameDevice'}
                                    />


                                    <InputPriceDevice
                                        name={'priceDevice'}
                                        id={'priceDevice'}
                                    />


                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                                <Tab label="Ссылка" {...a11yProps(0)} />
                                                <Tab label="Локально" {...a11yProps(1)} />
                                            </Tabs>
                                        </Box>
                                        <TabPanel value={value} index={0}>
                                            <LoadImageLink />
                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            Item Two
                                        </TabPanel>
                                    </Box>


                                    <Box>
                                        <Button>
                                            Отмена
                                        </Button>
                                        <Button type={"submit"}>
                                            Редактировать
                                        </Button>
                                    </Box>
                                </Form>
                            </Formik>
                        </Box>


                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};


function InputNameDevice(props) {

    const [field, meta] = useField(props);

    return (
        <React.Fragment>
            <TextField
                error={meta.touched && meta.error}
                {...field}
                {...props}
                helperText={meta.error}
                variant="outlined"
                label="Название устройства"

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