import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type DeleteDialogProps = {
    deleteID: number | null;
    handleClose: () => void;
    handleConfirm: () => void;
};

const ConfirmDeleteDialog = ({ deleteID, handleClose, handleConfirm }: DeleteDialogProps) => {
    return (
        <Dialog
            open={deleteID !== null}
            onClose={handleClose}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
        >
            <DialogTitle id="delete-dialog-title">Удалить устройство?</DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-dialog-description">
                    Это действие удалит как само устройство, так и все его модификации. Восстановить данные
                    автоматически будет невозможно.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Отменить
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    Подтвердить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteDialog;
