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
import { getCurrentDevice, setCurrentDeviceFromState } from '../../store/deviceSlice';
import { closeViewModal, shouldShowViewModal } from '../../store/layoutSlice';
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

    const handleClose = () => {
        dispatch(closeViewModal());
        dispatch(setCurrentDeviceFromState(null));
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
                    <CardMedia component="img" height="250" image={`${IMAGE_PATH_PREFIX}/${device.imagePath}`} />
                    <CardContent>
                        {true && (
                            <Typography color="textSecondary">
                                {'Оригинальное устройство: device.originalDeviceId'}
                            </Typography>
                        )}
                        <Typography variant="h5" component="h2">
                            {device.name}
                        </Typography>
                        <Typography color="textSecondary">{device.shortName}</Typography>
                        <Typography variant="body2" component="p">
                            {device.description}
                        </Typography>
                    </CardContent>

                    <CardActions>
                        <Button size="small" color="primary">
                            Edit
                        </Button>
                        <Button size="small" color="primary">
                            Create Mod
                        </Button>
                        <Button size="small" color="primary">
                            open original device
                        </Button>
                    </CardActions>
                </Card>
            </Fade>
        </Modal>
    );
};

export default ViewDevice;
