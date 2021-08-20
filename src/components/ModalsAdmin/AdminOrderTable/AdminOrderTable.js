import React, {useContext, useEffect, useState} from 'react';
import {
    Container,
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



const useStyles = makeStyles({
    Container: {
        margin: '2rem 0px',
    }, // a style rule
    tableSize: {
        maxHeight: 440,
    }, // a nested style rule
});



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
        setOrderItems(items)
        debugger
    }, [orderStore.OrderInfo])

    const [orderItems, setOrderItems] = useState([])


    return (
        <Container component={Paper} className={classes.Container} maxWidth="lg">
            <Typography variant="h3" component="h1" gutterBottom>
                Заказы
            </Typography>

            <TableContainer className={classes.tableSize} component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>№ Заказа</TableCell>
                            <TableCell align="right">Количество различных товаров</TableCell>
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