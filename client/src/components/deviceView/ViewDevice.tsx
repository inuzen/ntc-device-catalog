import React from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
// store
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getCurrentDevice, setCurrentDevice } from '../../store/deviceSlice';

const ViewDevice = () => {
    const device = useAppSelector(getCurrentDevice);
    const dispatch = useAppDispatch();
    const open = !!device;
    console.log(open);

    const handleClose = () => {
        dispatch(setCurrentDevice(null));
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
        >
            <Fade in={open}>
                <div>{device?.name}</div>
            </Fade>
        </Modal>
    );
};

export default ViewDevice;
