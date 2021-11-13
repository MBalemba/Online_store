import React, {useContext} from 'react';
import {
    Box, Button,
    Collapse,
    FormControl,
    IconButton,
    InputLabel,
    makeStyles,
    MenuItem, Paper,
    Select, Table, TableBody,
    TableCell, TableHead,
    TableRow, Typography, withStyles
} from "@material-ui/core";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/all";
import date from 'date-and-time';
import {Context} from "../../../index";
import {orderStore} from "../../../store/OrderStore";
import {styled} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    cakeStyles: {
        margin: theme.spacing(5, 1, 10),
        fontWeight: theme.typography.fontWeightLight,
        color: theme.palette.primary.light,
    },
    insertedTable:{
        backgroundColor: '#EEEEEE'
    },

    insertedTableHead: {
        ...theme.typography.subtitle1,
        fontWeight: theme.typography.fontWeightMedium,
        fontSize: '1.1rem',
        color: theme.palette.common.black
    },

    hoverRowInsertedTable:{
        padding: '0',
        backgroundColor: '#EEEEEE',
        transition: '0.5s',
        '&:hover': {
            backgroundColor: theme.palette.common.white,
        },
    },
    insertedTableTypography1: {
        padding: '0 1rem',
        fontWeight: theme.typography.fontWeightRegular,
        color: theme.palette.common.black,
        /*transition: '0.25s',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },*/
    },
    insertedTableTypography2: {
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.secondary.light,
        /*transition: '0.25s',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },*/
    }
}));


export const InsertedTableCellHead = ({children, ...other}) =>{
    const classes = useStyles()

    return(
        <TableCell className={classes.insertedTableHead} {...other} >
            {children}
        </TableCell>
    )
}

const InsertedTableCellBody = ({children, ...other}) =>{
    const classes = useStyles()

    return(
        <TableCell className={classes.insertedTableTypography1} {...other} >
            {children}
        </TableCell>
    )
}



const CakeTable = ({isUserTable = false, row}) => {

    console.log('totalSum: ', row)

    const {taskInstance, user} = useContext(Context)


    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState("");
    const [isStatusDisabled, setIsStatusDisabled] = React.useState(false);
    const classes = useStyles()

    const userCheckCallback = (status, info) => {
        return user.checkStatus(status, info)
    }

    const handleChange = (event) => {



        const callbackChangeStatus = () => {
            setStatus(event.target.value)
            setIsStatusDisabled(false)
        };

        orderStore.changeOrderStatus({
            "id": row.id,
            "status": event.target.value
        }, userCheckCallback, taskInstance, callbackChangeStatus)

    };

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <MdKeyboardArrowDown/> : <MdKeyboardArrowUp/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="left">{row?.order_devicesDTO?.length}</TableCell>
                <TableCell align="right">{row?.totalSumCheck?.toLocaleString()} ₽</TableCell>
                <TableCell align="right">{date.format(new Date(row.dataOfCreate), 'YYYY/MM/DD HH:mm:ss')}</TableCell>
                {isUserTable || <TableCell align="right">
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            disabled={isStatusDisabled}
                            IconComponent={MdKeyboardArrowDown}
                            value={status ? status : row.status}
                            label="Status"
                            onChange={handleChange}
                        >
                            <MenuItem value={'ACTIVE'}>
                                ACTIVE
                            </MenuItem>
                            <MenuItem value={'INACTIVE'}>
                                INACTIVE
                            </MenuItem>
                        </Select>
                    </FormControl>

                </TableCell>}

            </TableRow>
            {open &&
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>

                    <Box className={classes.cakeStyles}>
                        <Typography className={classes.insertedTableTypography2} variant="h5" gutterBottom component="div">
                            History
                        </Typography>
                        <Table className={classes.insertedTable} size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <InsertedTableCellHead>Имя товара</InsertedTableCellHead>
                                    <InsertedTableCellHead>Тип устройства</InsertedTableCellHead>
                                    <InsertedTableCellHead align="right">Цена за единицу (₽)</InsertedTableCellHead>
                                    <InsertedTableCellHead align="right">Кол. товара</InsertedTableCellHead>
                                    <InsertedTableCellHead align="right">Итого (₽)</InsertedTableCellHead>
                                    <InsertedTableCellHead align="right">Открыть карточку товара</InsertedTableCellHead>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {row.order_deviceResponseModels.map((product) => (
                                    <TableRow className={classes.hoverRowInsertedTable} key={product.deviceResponseModel.id}>
                                        <InsertedTableCellBody component="th" scope="row">
                                            {product.deviceResponseModel.name}
                                        </InsertedTableCellBody>
                                        <InsertedTableCellBody align="left">{product.deviceResponseModel.typeName}</InsertedTableCellBody>
                                        <InsertedTableCellBody align="right">{product.deviceResponseModel.price.toLocaleString()} ₽</InsertedTableCellBody>
                                        <InsertedTableCellBody align="right">{product.amountOfProduct}</InsertedTableCellBody>
                                        <InsertedTableCellBody className={classes.insertedTableTypography2} align="right">
                                            {(Number(product.deviceResponseModel.price) * product.amountOfProduct).toLocaleString()} ₽
                                        </InsertedTableCellBody>
                                        <InsertedTableCellBody align="right">
                                            <Button className={classes.insertedTableTypography1}>
                                                Открыть
                                            </Button>
                                        </InsertedTableCellBody>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>

                </TableCell>
            </TableRow>
            }

        </>
    );
};

export default CakeTable;