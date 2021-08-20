import React, {useContext, useEffect, useState} from 'react';
import {
    Container, Divider, LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {observer} from "mobx-react-lite";
import {orderStore} from "../../../store/OrderStore";
import {Context} from "../../../index";
import CakeTable from "./CakeTable";



const useStyles = makeStyles((theme) => ({
    Container: {
        margin: '2rem 0px',
    }, // a style rule
    tableSize: {
        maxHeight: 540,
        margin: theme.spacing(5,0)
    }, // a nested style rule
})
);



const AdminOrderTable = observer(() => {
    const classes = useStyles()
    const {taskInstance, user} = useContext(Context)

    const userCheckCallback = (status)=>{
        return user.checkStatus(status)
    }

    useEffect(()=>{
        orderStore.getOrderInfo(userCheckCallback)
    }, [])

    useEffect(()=>{
        const items = orderStore.OrderInfo
        console.log(items)
        setTimeout(()=>{setOrderItems(items)}, 1000)
        debugger
    }, [orderStore.OrderInfo])

    const [orderItems, setOrderItems] = useState([])


    return (
        <Container component={Paper} className={classes.Container} maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom>
                Заказы:
                <Divider />
            </Typography>
            {orderItems.length === 0 &&
            <LinearProgress />
            }



            <TableContainer className={classes.tableSize} component={Paper}>
                <Table stickyHeader aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>№ Заказа</TableCell>
                            <TableCell align="left">Количество различных товаров</TableCell>
                            <TableCell align="right">Сумма заказа</TableCell>
                            <TableCell align="right">Дата Создания</TableCell>
                            <TableCell align="right">Статус заказа</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderItems.length !== 0 &&
                        orderItems.map((row) => (
                                <CakeTable key={row.id} row={row} />
                            ))
                        }

                    </TableBody>
                </Table>
            </TableContainer>

        </Container>
    );
});

export default AdminOrderTable;