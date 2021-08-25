import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ConfirmDeleteDialog from '../layout/ConfirmDeleteDialog';

// store
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getCurrentDevice, setCurrentDeviceFromState, getSingleDevice, deleteDevice } from '../../store/deviceSlice';
import { closeViewModal, shouldShowViewModal, setEditMode, isEditingAllowed } from '../../store/layoutSlice';
import { IMAGE_PATH_PREFIX } from '../../api/api';

// styles
import './styles/viewDevice.scss';

const ViewDevice = () => {
    const dispatch = useAppDispatch();

    const open = useAppSelector(shouldShowViewModal);
    const device = useAppSelector(getCurrentDevice);
    const allowEditing = useAppSelector(isEditingAllowed);

    const [deleteID, setDeleteID] = useState<number | null>(null);

    if (!device) {
        return null;
    }

    const imagePath = device.imagePath || 'no-image.png';
    const handleClose = () => {
        setDeleteID(null);
        dispatch(closeViewModal());
        dispatch(setCurrentDeviceFromState(null));
    };

    const onOpenOriginal = () => {
        dispatch(getSingleDevice(device.originalDeviceId));
    };

    const onEditClick = () => {
        dispatch(setEditMode('edit'));
    };
    const onCreateModClick = () => {
        dispatch(setEditMode('mod'));
    };

    const onDeleteClick = () => {
        setDeleteID(device.id);
    };

    const onDeleteDialogClose = () => {
        setDeleteID(null);
    };
    const onDeleteDialogConfirm = () => {
        dispatch(deleteDevice(deleteID));
        handleClose();
    };

    const extraFields = device.additionalInfo && JSON.parse(device.additionalInfo);

    const renderExtraFields = () => {
        if (!extraFields.length) {
            return null;
        }

        return (
            <>
                <Typography variant="h5" component="p">
                    Дополнительная информация:
                </Typography>
                {extraFields.map((field) => (
                    <Typography variant="body2" component="p">
                        {`${field.name}: ${field.value}`}
                    </Typography>
                ))}
            </>
        );
    };

    const renderModifications = () => {
        if (!device?.modifications?.length) {
            return null;
        }

        return (
            <>
                <Typography variant="h5" component="p">
                    Список модификаций:
                </Typography>
                {[...device.modifications]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((device) => (
                        <Button
                            color="primary"
                            size="small"
                            disableRipple
                            onClick={() => dispatch(getSingleDevice(device.id))}
                        >
                            {device.name}
                        </Button>
                    ))}
            </>
        );
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 300,
            }}
            className="modal"
        >
            <Fade in={open}>
                <Card className="view-card">
                    <CardMedia component="img" height="250" image={`${IMAGE_PATH_PREFIX}/${imagePath}`} />
                    <CardContent>
                        {device.originalDevice && (
                            <Typography color="textSecondary">
                                Оригинальное устройство: {device.originalDevice.name}
                            </Typography>
                        )}
                        <Typography variant="h4" component="h2">
                            {device.name}
                        </Typography>
                        <Typography color="textSecondary">{device.shortName}</Typography>
                        <Typography variant="body2" component="p" className="description">
                            {device.description}
                        </Typography>
                        {renderExtraFields()}
                        {renderModifications()}
                    </CardContent>
                    <CardActions>
                        {allowEditing && (
                            <>
                                <Button size="small" color="primary" onClick={onEditClick}>
                                    Edit
                                </Button>
                                <Button size="small" color="primary" onClick={onCreateModClick}>
                                    Create Mod
                                </Button>
                                <Button size="small" color="secondary" onClick={onDeleteClick}>
                                    Delete
                                </Button>
                            </>
                        )}
                        {device.originalDevice && (
                            <Button size="small" color="primary" onClick={onOpenOriginal}>
                                open original device
                            </Button>
                        )}
                    </CardActions>
                    <ConfirmDeleteDialog
                        deleteID={deleteID}
                        handleClose={onDeleteDialogClose}
                        handleConfirm={onDeleteDialogConfirm}
                    />
                </Card>
            </Fade>
        </Modal>
    );
};

export default ViewDevice;
