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
import CakeTable, {InsertedTableCellHead} from "./CakeTable";



const useStyles = makeStyles((theme) => ({
    Container: {
        margin: '2rem 0px',
    }, // a style rule
    tableSize: {
        maxHeight: 540,
        margin: theme.spacing(5,0,5)
    }, // a nested style rule
})
);



const AdminOrderTable = observer(() => {
    const classes = useStyles()
    const {taskInstance, user} = useContext(Context)

    const userCheckCallback = (status, info)=>{
        return user.checkStatus(status, info)
    }

    useEffect(()=>{
        orderStore.getOrderInfo(userCheckCallback)
    }, [])

    useEffect(()=>{
        const items = orderStore.OrderInfo
        setTimeout(()=>{setOrderItems(items)}, 1000)

    }, [orderStore.OrderInfo])

    const [orderItems, setOrderItems] = useState([])


    return (
        <Container component={Paper} className={classes.Container} maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom>
                Заказы:
                <Divider />
            </Typography>
            {orderStore.FetchingStatus &&
            <LinearProgress />
            }


            {orderItems.length !== 0 &&
            <TableContainer className={classes.tableSize} component={Paper}>
                <Table stickyHeader aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <InsertedTableCellHead>№ Заказа</InsertedTableCellHead>
                            <InsertedTableCellHead align="left">Количество различных товаров</InsertedTableCellHead>
                            <InsertedTableCellHead align="right">Сумма заказа</InsertedTableCellHead>
                            <InsertedTableCellHead align="right">Дата Создания</InsertedTableCellHead>
                            <InsertedTableCellHead align="right">Статус заказа</InsertedTableCellHead>
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
            }

            {orderItems.length === 0 && !orderStore.FetchingStatus &&
                <div>
                    <Typography variant={'h5'}>Нет доступных заказов</Typography>
                </div>
            }

        </Container>
    );
});

export default AdminOrderTable;