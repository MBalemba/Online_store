import React from 'react';
import {
    Backdrop,
    Box,
    Button, CircularProgress,
    Divider,
    Fade, FormControl,
    FormControlLabel, FormLabel,
    Modal,
    Paper, Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {observer} from "mobx-react-lite";


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

const EditGender = observer( ({open, handleClose, gender, isEditGender, getNewGender})=> {
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
                            open={isEditGender}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Backdrop
                                open={isEditGender}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        </Modal>

                        <Box sx={{display: 'flex', justifyContent: 'space-between',}}>
                            <Typography id="transition-modal-title" variant="h4" component="h2">
                                Редактирование пола
                            </Typography>

                            <Button onClick={handleClose}>
                                Закрыть
                            </Button>
                        </Box>

                        <Divider/>

                        <Box sx={{marginTop: '2rem'}}>
                            <Formik
                                initialValues={{
                                    picked: gender,
                                }}

                                validationSchema={
                                    Yup.object({
                                        picked: Yup.string().required('Пустое поле'),
                                    })
                                }

                                onSubmit={(values, {setSubmitting}) => {

                                    let isMan = values.picked ==="мужчина"? true: false;
                                    getNewGender(isMan)
                                }}
                            >
                                {({values, errors, touched, getFieldProps }) => (
                                    <Form>
                                        {/*{JSON.stringify(errors)}*/}


                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Укажите свой пол</FormLabel>
                                            <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                                                <FormControlLabel {...getFieldProps('picked')} value="мужчина"  id={"мужчина"} name="picked" control={<Radio />} label="Мужчина" />
                                                <FormControlLabel {...getFieldProps('picked')}  value="женщина"  id={"женщина"} name="picked" control={<Radio />} label="Женщина" />
                                            </RadioGroup>
                                        </FormControl>

                                        {/*<Box>
                                            {JSON.stringify(values)}
                                        </Box>*/}


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
});

export default EditGender;