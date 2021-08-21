import React, {useContext} from 'react';
import {
    Box, Button,
    Collapse,
    FormControl,
    IconButton,
    InputLabel,
    makeStyles,
    MenuItem,
    Select, Table, TableBody,
    TableCell, TableHead,
    TableRow, Typography
} from "@material-ui/core";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/all";
import date from 'date-and-time';
import {Context} from "../../../index";
import {orderStore} from "../../../store/OrderStore";

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
    },
}));

const CakeTable = ({isUserTable=false, row }) => {

    console.log('totalSum: ', row?.totalSumCheck)

    const {taskInstance, user} = useContext(Context)


    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState("");
    const [isStatusDisabled, setIsStatusDisabled] = React.useState(false);
    const classes = useStyles()

    const userCheckCallback = (status) => {
        return user.checkStatus(status)
    }

    const handleChange = (event) => {

        debugger

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
                <TableCell align="left">{row?.order_devices?.length}</TableCell>
                <TableCell align="right">{row?.totalSumCheck?.toLocaleString()} ₽</TableCell>
                <TableCell align="right">{date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')}</TableCell>
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
                        <Typography variant="h6" gutterBottom component="div">
                            History
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Имя товара</TableCell>
                                    <TableCell>Тип устройства</TableCell>
                                    <TableCell align="right">Цена за единицу (₽)</TableCell>
                                    <TableCell align="right">Кол. товара</TableCell>
                                    <TableCell align="right">Итого (₽)</TableCell>
                                    <TableCell align="right">Открыть карточку товара</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row.order_devices.map((product) => (
                                    <TableRow key={product.deviceDTO.id}>
                                        <TableCell component="th" scope="row">
                                            {product.deviceDTO.name}
                                        </TableCell>
                                        <TableCell align="right">{product.deviceDTO.typeName}</TableCell>
                                        <TableCell align="right">{product.deviceDTO.price}</TableCell>
                                        <TableCell align="right">{product.amountOfProduct}</TableCell>
                                        <TableCell align="right">
                                            {(Number(product.deviceDTO.price) * product.amountOfProduct).toLocaleString()} ₽
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button>
                                                Открыть
                                            </Button>
                                        </TableCell>
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