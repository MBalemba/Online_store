
import React, {useContext, useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import './UserPage.css'
import '../general.css'
import {MdAddAPhoto} from "react-icons/all";
import img from './../../assets/svg/user.svg'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Box,
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




const UserPagePaper = styled(Paper)({
    background: ({isGradient})=> isGradient? 'linear-gradient(110deg, rgba(156,156,156,0) 30%, rgba(0,123,255,1) 140%)': 'white',
    border: 0,
    borderRadius: 3,
    padding: '0 30px',
    marginBottom: '2rem' ,
});

const useStyles = makeStyles(theme => ({
    accordion: {
        backgroundColor: 'transparent',
        '&:hover':{
            backgroundColor: 'white',
        },
    },
    Box: {
        padding: '2rem 0rem',
    }

}));





const UserPage = observer(() => {

    const classes =useStyles()
    const {taskInstance, user} = useContext(Context)



    useEffect(()=>{

        user.getOrderItems(taskInstance)
    }, [])


    return (
        <Container >
            <UserPagePaper isGradient elevation={3}>
                <Grid lg={3}>
                    <div className={'avatarBlock'}>
                        <div style={{ backgroundImage: `url(${img})` }} className={'avatarBlock__img'}>

                            <label htmlFor="load_AvaImg">
                               <div  className={'avatarBlock__modalMenu'}>
                                   <MdAddAPhoto />
                               </div>
                            </label>


                            <input className={'avatarBlock__inputLoad'} id={'load_AvaImg'} type="file"/>
                        </div>

                        <div className={'avatarBlock__nameBlock'}>


                            <Typography variant="subtitle2" gutterBottom>Балемба</Typography>
                            <Typography variant="subtitle2" gutterBottom>Максим</Typography>
                            <Typography variant="subtitle2" gutterBottom>Александрович</Typography>

                        </div>
                    </div>
                </Grid>

                <Grid lg={12}>
                    <List component="div" >
                        <ListItem button>
                            <ListItemText primary="Дата рождения" secondary="Jan 9, 2001"/>
                        </ListItem>
                        <Divider />
                        <ListItem button divider>
                            <ListItemText primary="Ваш пол" secondary="Мужской"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Email" secondary={'balembamaks@gmail.com'}/>
                        </ListItem>
                        <Divider light />
                        <ListItem button>
                            <ListItemText primary="Выйти из аккаунта" />
                        </ListItem>
                    </List>

                </Grid>
            </UserPagePaper>

            <UserPagePaper>
                    <Grid spacing={3} container>
                        <Grid item lg={12}>
                            <Box>
                                <Typography variant="h2">Активные заказы</Typography>
                                <TableUserOrder activeOrders/>
                            </Box>
                        </Grid>
                    </Grid>
            </UserPagePaper>

            <UserPagePaper>
                            <Box>
                                <Typography variant="h2">Завершенные заказы</Typography>
                                <TableUserOrder/>
                            </Box>
            </UserPagePaper>

        </Container>
    );
});

export default UserPage;