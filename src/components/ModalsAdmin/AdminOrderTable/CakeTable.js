import React from 'react';
import {IconButton, TableCell, TableRow} from "@material-ui/core";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/all";
import date from 'date-and-time';


const CakeTable = ({row}) => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <TableRow >
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="right">{row?.order_devices?.length}</TableCell>
                <TableCell align="right">{(32321322).toLocaleString()} ₽</TableCell>
                <TableCell align="right">{date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
        </>
    );
};

export default CakeTable;