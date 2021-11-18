import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function AlertDialog({callback,questionText='',  text='', isOpen}) {


    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={()=>callback(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {questionText}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>callback(false)}>Нет</Button>
                    <Button onClick={()=>callback(true)} autoFocus>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}