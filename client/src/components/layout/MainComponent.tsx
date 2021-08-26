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
import { getEditMode, isEditingAllowed, setEditMode, shouldShowViewModal } from '../../store/layoutSlice';
import { getAllDevices, setCurrentDeviceFromState } from '../../store/deviceSlice';

const MainComponent = () => {
    const onButtonClick = () => {
        dispatch(setEditMode('new'));
    };

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllDevices({ limit: 5, offset: 0 }));
    }, []);

    const allowEditing = useAppSelector(isEditingAllowed);
    const openDrawer = useAppSelector(getEditMode);
    const isView = useAppSelector(shouldShowViewModal);

    const onClose = () => {
        dispatch(setEditMode('none'));
        if (!isView) dispatch(setCurrentDeviceFromState(null));
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
                    <Fade in={allowEditing}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={onButtonClick}
                            className="add-device-btn"
                            startIcon={<AddBoxIcon />}
                        >
                            Добавить
                        </Button>
                    </Fade>
                </div>
                <TableContainer />
            </div>
        </div>
    );
};

export default MainComponent;
