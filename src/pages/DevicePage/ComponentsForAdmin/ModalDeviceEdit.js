import React from 'react';
import {Backdrop, Box, Button, Divider, Fade, Modal, TextField, Typography} from "@mui/material";
import {Formik, Form as FormFormik, useField, useFormik, Field, ErrorMessage, Form} from 'formik';
import * as Yup from 'yup';

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


const ModalDevice = ({edit = false, open, setOpen}) => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                            </Typography>

                            <Button onClick={handleClose}>
                                Закрыть
                            </Button>
                        </Box>

                        <Divider/>

                        <Box sx={{marginTop: '1rem'}}>
                            <Formik
                                initialValues={{firstName: '', lastName: '', email: ''}}
                                validationSchema={Yup.object({
                                    firstName: Yup.string()
                                        .max(15, 'Must be 15 characters or less')
                                        .required('Required'),
                                    lastName: Yup.string()
                                        .max(20, 'Must be 20 characters or less')
                                        .required('Required'),
                                    email: Yup.string().email('Invalid email address').required('Required'),
                                })}
                                onSubmit={(values, {setSubmitting}) => {
                                    setTimeout(() => {
                                        alert(JSON.stringify(values, null, 2));
                                        setSubmitting(false);
                                    }, 400);
                                }}
                            >

                                <Form>
                                    <label htmlFor="firstName">First Name</label>
                                    <Field name="nameDevice" type="text"/>
                                    <ErrorMessage name="firstName"/>

                                    <label htmlFor="lastName">Last Name</label>
                                    <Field name="priceInput" type="text"/>
                                    <ErrorMessage name="lastName"/>

                                    <label htmlFor="email">Email Address</label>
                                    <Field name="email" type="email"/>
                                    <ErrorMessage name="email"/>

                                    <button type="submit">Submit</button>
                                </Form>
                            </Formik>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};


function InputNameDevice({props}) {

    const [field, meta] = useField(props);

    return (
        <React.Fragment>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </React.Fragment>

    )
}

export default ModalDevice;