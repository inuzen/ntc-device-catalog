import React, { useState, useEffect } from 'react';

// components
import TableContainer from '../table/TableContainer';
import EditDevice from '../deviceView/EditDevice';
import ViewDevice from '../deviceView/ViewDevice';
import Header from '../header/Header';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Fade from '@material-ui/core/Fade';

// styles
import './mainStyles.scss';

// store
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { isEditingAllowed } from '../../store/authSlice';
import { getAllDevices, getDeviceList } from '../../store/deviceSlice';

const MainComponent = () => {
    const [open, setOpen] = useState(false);
    const onButtonClick = () => {
        setOpen(!open);
    };

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllDevices());
    }, []);

    const allowEditing = useAppSelector(isEditingAllowed);
    const devices = useAppSelector(getDeviceList);

    // console.log('MainComp ', devices);

    return (
        <div className="main-container">
            <Header />
            <Drawer anchor="left" open={open} className="drawer" onClose={onButtonClick}>
                <EditDevice />
            </Drawer>
            <ViewDevice />
            <div className="app-content container-margin">
                <div className="add-btn-wrapper">
                    {/* <Fade in={allowEditing}> */}
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={onButtonClick}
                        className="add-device-btn"
                        startIcon={<AddBoxIcon />}
                    >
                        Add device
                    </Button>
                    {/* </Fade> */}
                </div>
                <TableContainer deviceList={devices} />
            </div>
        </div>
    );
};

export default MainComponent;
