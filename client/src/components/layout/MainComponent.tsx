import React, { useEffect } from 'react';

// components
import TableContainer from '../table/TableContainer';
import EditDevice from '../deviceView/EditDevice';
import ViewDevice from '../deviceView/ViewDevice';
import Header from '../header/Header';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Fade from '@material-ui/core/Fade';
import Drawer from '@material-ui/core/Drawer';
// styles
import './mainStyles.scss';

// store
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getEditMode, isEditingAllowed, setEditMode } from '../../store/layoutSlice';
import { getAllDevices, getDeviceList, setCurrentDeviceFromState } from '../../store/deviceSlice';

const MainComponent = () => {
    const onButtonClick = () => {
        dispatch(setEditMode('new'));
    };

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllDevices());
    }, []);

    const allowEditing = useAppSelector(isEditingAllowed);
    const devices = useAppSelector(getDeviceList);
    const openDrawer = useAppSelector(getEditMode);

    const onClose = () => {
        dispatch(setEditMode('none'));
        dispatch(setCurrentDeviceFromState(null));
    };

    return (
        <div className="main-container">
            <Header />
            <Drawer anchor="left" open={openDrawer !== 'none'} className="drawer" onClose={onClose}>
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
