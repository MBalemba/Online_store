import React, {useContext, useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import './UserPage.css'
import '../general.css'
import {MdAddAPhoto} from "react-icons/all";
import img from './../../assets/svg/user.svg'
import {
    Box,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText, makeStyles,
    Paper,
    Typography
} from "@material-ui/core";
import {styled} from "@material-ui/core/styles";
import {Context} from "../../index";
import TableUserOrder from "../../components/UserPage/TableActiveOrder";
import {observer} from "mobx-react-lite";
import {Button} from "@mui/material";
import EditFio from "../../components/UserPage/EditFio";
import EditGender from "../../components/UserPage/EditGender";
import AlertDialog from "../../components/Common/AlertDialog/alert";


const UserPagePaper = styled(Paper)({
    background: ({isGradient}) => isGradient ? 'linear-gradient(110deg, rgba(156,156,156,0) 30%, rgba(0,123,255,1) 140%)' : 'white',
    border: 0,
    borderRadius: 3,
    padding: '0 30px',
    marginBottom: '2rem',
});

const useStyles = makeStyles(theme => ({
    accordion: {
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: 'white',
        },
    },
    Box: {
        padding: '2rem 0rem 0.2rem',
    }

}));


const UserPage = observer(() => {







    const classes = useStyles()
    const {taskInstance, user} = useContext(Context)
    const [isOutDialogOpen, changeIsOutDialogOpen] = React.useState(false)
    const [editGender, setEditGender] = useState(false)
    const [editFio, setEditFio] = useState(false)

    function getPersonalData() {
        user.requestFromProfileData().then(() => {

        }).catch((mistake) => {
            user.checkStatus(mistake.status, mistake.info).then(() => [
                getPersonalData()
            ])
        })
    }

    function exit(bool) {
        changeIsOutDialogOpen(false)
        if(bool){
            user.Out();
        }
    }


    function getNewFio(fio) {

        function endLoadEditStatusFio(bool){
            user.setIsEditFio(bool)
        }

        function editFio() {
            user.setIsEditFio(true)
            user.editFio(fio).then(() => {

                setTimeout(()=> {
                    endLoadEditStatusFio(false)
                    taskInstance.createTask('Успешно изменено имя', 'success')
                }, 1000);
            }).catch((mistake) => {
                user.checkStatus(mistake.status, mistake.info).then(() => [
                    editFio()
                ]).catch(()=>{
                    setTimeout(()=>endLoadEditStatusFio(false), 1000);
                })
            })
        }
        editFio();
    }

    function getNewGender(isMan) {

        function endLoadEditStatusGender(bool){
            user.setIsEditGender(bool)
        }

        function editGender() {
            user.setIsEditGender(true)
            user.editGender(isMan).then(() => {

                setTimeout(()=> {
                    endLoadEditStatusGender(false)
                    taskInstance.createTask('Успешно изменен гендер', 'success')
                }, 1000);
            }).catch((mistake) => {
                user.checkStatus(mistake.status, mistake.info).then(() => {
                    editGender()
                }).catch(()=>{
                    setTimeout(()=>endLoadEditStatusGender(false), 1000);
                })
            })
        }
        editGender();
    }

    useEffect(() => {
        user.getOrderItems(taskInstance)
        getPersonalData()
    }, [])


    return (
        <Container>
            <UserPagePaper isGradient elevation={3}>
                {/* <Grid lg={3}>
                    <div className={'avatarBlock'}>
                        <div style={{backgroundImage: `url(${img})`}} className={'avatarBlock__img'}>

                            <label htmlFor="load_AvaImg">
                                <div className={'avatarBlock__modalMenu'}>
                                    <MdAddAPhoto/>
                                </div>
                            </label>


                            <input className={'avatarBlock__inputLoad'} id={'load_AvaImg'} type="file"/>
                        </div>

                        <div className={'avatarBlock__nameBlock'}>
                            <Typography variant="subtitle2" gutterBottom>{user.InfoProfile.name[0]}</Typography>
                            <Typography variant="subtitle2" gutterBottom>{user.InfoProfile.name[1]}</Typography>
                            <Typography variant="subtitle2" gutterBottom>{user.InfoProfile.name[2]}</Typography>
                        </div>
                    </div>
                </Grid>*/}

                <Grid lg={12}>
                    <List component="div">

                        <ListItem button divider>
                           <ListItemText primary="Имя"
                                                                              secondary={user.InfoProfile.name[0] + ' ' + user.InfoProfile.name[1] + ' ' + user.InfoProfile.name[2]}/>
                            <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: '10px'}}>
                                <Button onClick={() => setEditFio(true)} variant={'contained'}>
                                    Редактировать
                                </Button>
                            </Box>
                        </ListItem>

                        <ListItem button divider>
                            {user.InfoProfile.isMan === null && <ListItemText primary="Пол"
                                                                              secondary={'Не указано редактируйте информацию о себе, укажите пол'}/>}

                            {user.InfoProfile.isMan === false && <ListItemText primary="Пол"
                                                                               secondary={'Женщина'}/>}
                            {user.InfoProfile.isMan === true && <ListItemText primary="Пол"
                                                                               secondary={'Мужчина'}/>}

                            <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: '10px'}}>
                                <Button onClick={() => setEditGender(true)} variant={'contained'}>
                                    Редактировать
                                </Button>
                            </Box>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Номер" secondary={user.InfoProfile.telephone_number}/>
                        </ListItem>
                        <Divider light/>
                        <ListItem onClick={()=>changeIsOutDialogOpen(true)} button>
                            <ListItemText  primary="Выйти из аккаунта"/>
                        </ListItem>
                    </List>

                </Grid>
            </UserPagePaper>

            <UserPagePaper>
                <Box className={classes.Box}>
                    <Typography variant="h2">Активные заказы</Typography>
                    <TableUserOrder activeOrders/>
                </Box>
            </UserPagePaper>

            <UserPagePaper>
                <Box className={classes.Box}>
                    <Typography variant="h2">Завершенные заказы</Typography>
                    <TableUserOrder/>
                </Box>
            </UserPagePaper>


            <EditFio getNewFio={getNewFio} open={editFio}
                     isEditFio={user.EditFio}
                     handleClose={() => {
                         setEditFio(false)
                     }}
                     firstName={user.InfoProfile.name[1]}
                     lastName={user.InfoProfile.name[0]}
                     middleName={user.InfoProfile.name[2]}

            />

            <EditGender getNewGender={getNewGender} open={editGender}
                        handleClose={() => {
                            setEditGender(false)
                        }}
                        gender={user.InfoProfile.isMan ? 'мужчина' : 'женщина'}
                        isEditGender = {user.EditGender}

            />

            <AlertDialog callback={exit} questionText={'Вы точно хотите выйти?'} isOpen={isOutDialogOpen} />


        </Container>
    );
});


export default UserPage;