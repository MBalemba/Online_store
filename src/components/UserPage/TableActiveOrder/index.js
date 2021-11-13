import React, {useContext, useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@material-ui/core";
import CakeTable from "../../ModalsAdmin/AdminOrderTable/CakeTable";
import {makeStyles} from "@material-ui/styles";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";


const useStyles = makeStyles((theme) => ({
        Container: {
            margin: '10rem 0px',
        }, // a style rule
        tableSize: {
            maxHeight: 540,
            margin: theme.spacing(5, 0),
            width: '100%',
        }, // a nested style rule
    })
);

const TableUserOrder = observer(({row, activeOrders}) => {
    const classes = useStyles()
    const {taskInstance, user} = useContext(Context)
    const [tableData, setTableData] = useState([])

    useEffect(() => {

        let items = null

        if (activeOrders) {
            items = user.OrderItems.filter(el => el.status === 'ACTIVE')
        } else {
            items = user.OrderItems.filter(el => el.status === 'INACTIVE')
        }

        setTableData(items)
    }, [user.OrderItems.length])


    if (tableData.length === 0) {
        if (activeOrders) {
            return <Typography variant="overline" display="block" gutterBottom>
                У вас нет активных заказов
            </Typography>
        } else {
            return <Typography variant="overline" display="block" gutterBottom>
                У вас нет завершенных заказов
            </Typography>
        }
    }

    return (
        <TableContainer className={classes.tableSize} component={Paper}>
            <Table stickyHeader aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>№ Заказа</TableCell>
                        <TableCell align="left">Количество различных товаров</TableCell>
                        <TableCell align="right">Сумма заказа</TableCell>
                        <TableCell align="right">Дата Создания</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.length !== 0 &&
                    tableData.map((row) => (
                        <CakeTable isUserTable={true} key={row.id} row={row}/>
                    ))
                    }

                </TableBody>
            </Table>
        </TableContainer>
    );
});

export default TableUserOrder;