import React from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// store
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getCurrentDevice, setCurrentDeviceFromState, getSingleDevice } from '../../store/deviceSlice';
import { closeViewModal, shouldShowViewModal, setEditMode } from '../../store/layoutSlice';
import { IMAGE_PATH_PREFIX } from '../../api/api';

// styles
import './styles/viewDevice.scss';

const ViewDevice = () => {
    const dispatch = useAppDispatch();

    const open = useAppSelector(shouldShowViewModal);
    const device = useAppSelector(getCurrentDevice);

    if (!device) {
        return null;
    }

    const imagePath = device.imagePath || 'no-image.png';
    const handleClose = () => {
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

    const extraFields = JSON.parse(device.additionalInfo);

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
                        <Typography variant="body1" component="p" paragraph>
                            {device.description}
                        </Typography>
                        {!!extraFields.length && (
                            <Typography variant="h6" component="p">
                                Дополнительная информация:
                            </Typography>
                        )}
                        {!!extraFields.length &&
                            extraFields.map((field) => (
                                <Typography variant="body2" component="p">
                                    {`${field.name}: ${field.value}`}
                                </Typography>
                            ))}
                    </CardContent>

                    <CardActions>
                        <Button size="small" color="primary" onClick={onEditClick}>
                            Edit
                        </Button>
                        <Button size="small" color="primary" onClick={onCreateModClick}>
                            Create Mod
                        </Button>
                        {device.originalDevice && (
                            <Button size="small" color="primary" onClick={onOpenOriginal}>
                                open original device
                            </Button>
                        )}
                    </CardActions>
                </Card>
            </Fade>
        </Modal>
    );
};

export default ViewDevice;
